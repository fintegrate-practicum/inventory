import { Injectable, Logger, NotFoundException, ForbiddenException, BadRequestException, ConflictException } from '@nestjs/common';
import { Product } from './product.entity';
import { productValidationSchema } from './product.validate';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';


@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) { }
  async getAllProducts(): Promise<Product[]> {
    const products = await this.productModel.find({ isActive: true });
    return products;
  }

  async getProductById(ProductId: string): Promise<Product> {
    const product = await this.productModel.findOne({ id: ProductId, isActive: true });

    if (!product)
      throw new NotFoundException('product not found.');
    return product;
  }

  async getProductBybussinessId(businessId: string): Promise<Product[]> {
    const products = await this.productModel.find({ bussinesId: businessId, isActive: true });
    return products;
  }

  async softDeleteProduct(productId: string): Promise<void> {
    const product = await this.productModel.findOne({ where: { id: productId } });
    if (!product) {
      throw new NotFoundException('Product not found.');
    }
    product.isActive = false;
    await this.productModel.create(product);
  }

  async addNewProduct(productData: Product, adminId: string): Promise<any> {
    if (!this.userHasBusinessManagerPermission(adminId))
      throw new ForbiddenException('Insufficient permissions to add a new product.');
    try {
      await this.validateProduct(productData)
      let sameName = await this.productModel.findOne({ name: productData.name, isActive: true })
      if (sameName)
        throw new ConflictException('a product with the same name already exists');
      const newProduct = await this.productModel.create(productData);
      return newProduct;

    }
    catch (err) {
      this.logger.log(err);
    }

  }

  async updateProduct(productId: Types.ObjectId, updatedFields: any): Promise<Product> {
    await this.validateProduct(updatedFields);
    const product = await this.productModel.findOneAndUpdate(
      { id: productId, isActive: true },
      updatedFields,
      { new: true }
    );
    if (!product) {
      throw new NotFoundException('Component not found.');
    }
    this.logger.log("The product is updated");
    return product;
  }

  async validateProduct(updatedFields: any): Promise<void> {
    const { error } = await productValidationSchema.validateAsync(updatedFields);
    if (error) {
      throw new BadRequestException('Component data is invalid.', error.details.map(err => err.message));
    }
  }

  async updateProductDiscount(newSalePercentage: number, adminId: string): Promise<void> {
    if (!this.userHasBusinessManagerPermission(adminId))
      throw new ForbiddenException('Insufficient permissions to update products.');

    const managerProducts = await this.productModel.find({ adminId, isActive: true });
    await Promise.all(managerProducts.map(async (product: Product) => {
      product.salePercentage = newSalePercentage;
      return this.productModel.create(product);
    }));
  }

  private userHasBusinessManagerPermission(adminId: string): boolean {
    return true;//בדיקת הרשאות גישה
  }
}