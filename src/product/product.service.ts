import {
  Injectable,
  Logger,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { Product } from './product.entity';
import { productValidationSchema } from './product.validate';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import axiosInstance from 'src/axios/workerAxios';
import { Message } from '../interfaces/Message';
import { RabbitPublisherService } from '../rabbit-publisher/rabbit-publisher.service';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    private readonly rabbitPublisherService: RabbitPublisherService,
  ) { }

  async getProductById(productId: string): Promise<Product> {
    const product = await this.productModel
      .findOne({ _id: new Types.ObjectId(productId), isActive: true })
      .exec();
    if (!product) throw new NotFoundException('Product not found.');
    return product;
  }

  async getProductByBusinessId(businessId: string): Promise<Product[]> {
    const products = await this.productModel.find({ businessId, isActive: true }).exec();
    const LowInventory = products.filter(
      (p) => p.stockQuantity <= 5,
    );

    if (LowInventory.length > 0) {
      const adminId = LowInventory[0].adminId;

      try {
        const admin = await this.getAdmin(adminId);
        const AdminDetails = await this.getAdminDetails(admin.data.userId)
        const EmailAdmin = AdminDetails.data.userEmail;
        const message: Message = {
          pattern: 'message_exchange',
          data: {
            to: EmailAdmin,
            subject: 'Update on low stock',
            text: "",
            type: 'email',
            kindSubject: 'message',
            description: LowInventory.map(p => p.name),
            date: new Date(),
            managerName: admin.data.nameEmployee,
          },
        };
        try {
          await this.rabbitPublisherService.publishMessageToCommunication(message);
        } catch (error) {
          console.error('Error publishing message to RabbitMQ:', error);
        }
      }
      catch {
        throw new Error("Admin not found");
      }
    }
    return products;
  }

  async softDeleteProduct(productId: string): Promise<void> {
    const product = await this.productModel
      .findOne({ _id: new Types.ObjectId(productId) })
      .exec();
    if (!product) {
      throw new NotFoundException('Product not found.');
    }
    product.isActive = false;
    await product.save();
  }

  async addNewProduct(productData: Product, adminId: string): Promise<Product> {
    if (!this.userHasBusinessManagerPermission(adminId))
      throw new ForbiddenException('Insufficient permissions to add a new product.');
    try {
      await this.validateProduct(productData);
      const sameName = await this.productModel
        .findOne({ name: productData.name, isActive: true })
        .exec();
      if (sameName)
        throw new ConflictException('A product with the same name already exists');
      const newProduct = new this.productModel(productData);
      return await newProduct.save();
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Failed to add new product', err.message);
    }
  }

  async updateProduct(productId: Types.ObjectId, updatedFields: any): Promise<Product> {
    await this.validateProduct(updatedFields);
    const product = await this.productModel
      .findOneAndUpdate({ _id: productId, isActive: true }, updatedFields, { new: true })
      .exec();
    if (!product) {
      throw new NotFoundException('Product not found.');
    }
    this.logger.log('The product is updated');
    return product;
  }

  async validateProduct(updatedFields: any): Promise<void> {
    const { error } = await productValidationSchema.validateAsync(updatedFields);
    if (error) {
      throw new BadRequestException(
        'Product data is invalid.',
        error.details.map((err) => err.message),
      );
    }
  }

  async updateProductDiscount(newSalePercentage: number, adminId: string): Promise<void> {
    if (!this.userHasBusinessManagerPermission(adminId))
      throw new ForbiddenException('Insufficient permissions to update products.');

    const managerProducts = await this.productModel
      .find({ adminId, isActive: true })
      .exec();
    await Promise.all(
      managerProducts.map(async (product: Product) => {
        product.salePercentage = newSalePercentage;
        return product.save();
      }),
    );
  }

  private userHasBusinessManagerPermission(adminId: string): boolean {
    // Implement permission check logic here
    console.log(adminId);
    return true;
  }

  async getLowStockProducts(businessId: string): Promise<{ productName: string; count: number }[]> {
    const lowStockProducts = await this.productModel.aggregate([
      {
        $match: {
          businessId: businessId,
        },
      },
      {
        $project: {
          productName: "$name",
          count: "$stockQuantity",
        },
      },
      {
        $sort: { count: 1 },
      },
      {
        $limit: 5,
      },
      {
        $unset: "_id"
      }
    ]);
    return lowStockProducts;
  }

  
  private async getAdmin(adminId: string): Promise<any> {
    try {
      const response = await axiosInstance.get(
        `/workers/${adminId}`,
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  private async getAdminDetails(userId: string): Promise<any> {
    try {
      const response = await axiosInstance.get(
        `/user/${userId}`,
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

