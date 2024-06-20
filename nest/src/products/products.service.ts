
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
/////for example only////////
@Injectable()
export class ProductService {
  constructor(
  @InjectRepository(Product)
  private readonly productRepository: Repository<Product>) { } 

  async getAllProducts(): Promise<any[]> {
    const products = await this.productRepository.findBy( {isActive: true });
    return products;
  }

  async getProductById(ProductId: string): Promise<any> {
    const product = await this.productRepository.findOneBy( { id: ProductId, isActive: true  });

    if (!product) 
      throw new NotFoundException('product not found.');
    return product;
  }

  async getProductBybussinessId(businessId: string): Promise<Product[]> {
    const products = await this.productRepository.findBy({ bussinesId:businessId, isActive: true } );
    return products;
  }

  async softDeleteProduct(productId: string): Promise<void> {
    const product = await this.productRepository.findOne({where:{id:productId}});

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    product.isActive = false;

    await this.productRepository.save(product);
  }

  async addNewProduct(productData: Product, adminId: string): Promise<any> {
    if (!this.userHasBusinessManagerPermission(adminId)) {
      throw new ForbiddenException('Insufficient permissions to add a new product.');
    }
    const savedProduct = await this.productRepository.save(productData);
    return savedProduct;
  }

  async updateProduct(ProductId: string, updatedFields: any, adminId: string): Promise<any> {
    const product = await this.productRepository.findOneBy({ id: ProductId, isActive: true } );

    if (!product) 
      throw new NotFoundException('Product not found.');
    
    if (product.adminId !== adminId) 
      throw new ForbiddenException('You are not authorized to update this product.');

    Object.assign(product, updatedFields);
    const updatedProduct = await this.productRepository.save(product);
    return updatedProduct;
  }

  async updateProductDiscount(newSalePercentage: number, adminId: string): Promise<void> {
    if (!this.userHasBusinessManagerPermission(adminId)) 
      throw new ForbiddenException('Insufficient permissions to update products.');

    const managerProducts = await this.productRepository.findBy({ adminId, isActive: true  });
    await Promise.all(managerProducts.map(async (product: any) => {
      product.salePercentage = newSalePercentage;
      return this.productRepository.save(product);
    }));
  }

  private userHasBusinessManagerPermission(adminId: string): boolean {
    return true; // Placeholder implementation, should be replaced with actual permission logic
  }
}






