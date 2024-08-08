import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { Product } from './product.entity';
import { productValidationSchema } from './product.validate';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {}

  async getAllProducts(): Promise<Product[]> {
    const products = await this.productModel.find({ isActive: true }).exec();
    return products;
  }

  async getProductById(productId: string): Promise<Product> {
    const product = await this.productModel
      .findOne({ _id: new Types.ObjectId(productId), isActive: true })
      .exec();
    if (!product) throw new NotFoundException('Product not found.');
    return product;
  }

  async getProductByBusinessId(businessId: string): Promise<Product[]> {
    const products = await this.productModel.find({ businessId, isActive: true }).exec();
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

  async updateProduct(productId: string, updatedFields: any): Promise<Product> {
    await this.validateProduct(updatedFields);
    const product = await this.productModel
      .findOneAndUpdate(
        { _id: new Types.ObjectId(productId), isActive: true },
        updatedFields,
        { new: true },
      )
      .exec();
    if (!product) {
      throw new NotFoundException('Product not found.');
    }
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
    return true;
  }
}
