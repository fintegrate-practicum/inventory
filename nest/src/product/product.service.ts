import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Product } from './product.entity';
import { productValidationSchema } from '../entities/Product.validate';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
/////for example only////////
@Injectable()
export class ProductService {
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

  async addNewProduct(productData: Product, adminId: string): Promise<Product> {
    productValidationSchema.validate(productData);
    if (!this.userHasBusinessManagerPermission(adminId)) {
      throw new ForbiddenException('Insufficient permissions to add a new product.');
    }
    const savedProduct = await this.productModel.create(productData);
    return savedProduct;
  }

  async updateProduct(ProductId: string, updatedFields: any, adminId: string): Promise<Product> {
    const product = await this.productModel.findOne({ id: ProductId, isActive: true });

    if (!product)
      throw new NotFoundException('Product not found.');

    if (product.adminId !== adminId)
      throw new ForbiddenException('You are not authorized to update this product.');

    Object.assign(product, updatedFields);
    const updatedProduct = await this.productModel.create(product);
    return updatedProduct;
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