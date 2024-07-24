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
    console.log('Fetching all active products');
    const products = await this.productModel.find({ isActive: true });
    return products;
  }

  async getProductById(ProductId: string): Promise<Product> {
    console.log(`Fetching product with ID: ${ProductId}`);
    const product = await this.productModel.findOne({ id: ProductId, isActive: true });

    if (!product) {
      console.error('Product not found.');
      throw new NotFoundException('Product not found.');
    }
    return product;
  }

  async getProductByBusinessId(businessId: string): Promise<Product[]> {
    console.log(`Fetching products for business ID: ${businessId}`);
    const products = await this.productModel.find({ businessId, isActive: true });
    return products;
  }

  async softDeleteProduct(productId: string): Promise<void> {
    console.log(`Soft deleting product with ID: ${productId}`);
    const product = await this.productModel.findOne({ id: productId });
    if (!product) {
      console.error('Product not found.');
      throw new NotFoundException('Product not found.');
    }
    product.isActive = false;
    await this.productModel.updateOne({ id: productId }, product);
  }

  async addNewProduct(productData: Product, adminId: string): Promise<any> {
    console.log('Adding a new product');
    if (!this.userHasBusinessManagerPermission(adminId)) {
      console.error('Insufficient permissions to add a new product.');
      throw new ForbiddenException('Insufficient permissions to add a new product.');
    }
    try {
      await this.validateProduct(productData);
      const sameName = await this.productModel.findOne({
        name: productData.name,
        isActive: true,
      });
      if (sameName) {
        console.error('A product with the same name already exists.');
        throw new ConflictException('A product with the same name already exists.');
      }
      const newProduct = await this.productModel.create(productData);
      console.log('New product created:', newProduct);
      return newProduct;
    } catch (err) {
      console.error('Error adding new product:', err);
      throw err;
    }
  }

  async updateProduct(productId: Types.ObjectId, updatedFields: any): Promise<Product> {
    console.log(`Updating product with ID: ${productId}`);
    await this.validateProduct(updatedFields);
    const product = await this.productModel.findOneAndUpdate(
      { id: productId, isActive: true },
      updatedFields,
      { new: true },
    );
    if (!product) {
      console.error('Product not found.');
      throw new NotFoundException('Product not found.');
    }
    console.log('The product is updated:', product);
    return product;
  }

  async validateProduct(updatedFields: any): Promise<void> {
    const { error } = await productValidationSchema.validateAsync(updatedFields);
    if (error) {
      console.error(
        'Product data is invalid:',
        error.details.map((err) => err.message),
      );
      throw new BadRequestException(
        'Product data is invalid.',
        error.details.map((err) => err.message),
      );
    }
  }

  async updateProductDiscount(newSalePercentage: number, adminId: string): Promise<void> {
    console.log('Updating product discount');
    if (!this.userHasBusinessManagerPermission(adminId)) {
      console.error('Insufficient permissions to update products.');
      throw new ForbiddenException('Insufficient permissions to update products.');
    }

    const managerProducts = await this.productModel.find({ adminId, isActive: true });
    await Promise.all(
      managerProducts.map(async (product: Product) => {
        product.salePercentage = newSalePercentage;
        return this.productModel.updateOne({ id: product.id }, product);
      }),
    );
  }

  private userHasBusinessManagerPermission(adminId: string): boolean {
    console.log(`Checking permissions for admin ID: ${adminId}`);
    return true; // Replace with actual permission checking logic
  }
}
