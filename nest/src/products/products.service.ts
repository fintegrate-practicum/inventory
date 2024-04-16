

import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';

@Injectable()
export class ProductService {

  constructor(private readonly ProductRepository: ProductRepository) { }

  async getAllProducts(): Promise<any[]> {
    // adminId-token
    const products = await this.ProductRepository.find({ isActive:true,adminId });

    return products;
  }


  async getProductById(ProductId: string): Promise<any[]> {
    const product = await this.ProductRepository.findById({ProductId,isActive:true});

    if (!product) 
      throw new NotFoundException('product not found.');
    return product;
  }


  async getProductBybussinessId(businessId: string): Promise<any[]> {
    const products = await this.ProductRepository.find({businessId ,isActive:true} );
    return products;
  }

  async softDeleteProduct(productId: string): Promise<void> {
    // adminId-token
    const product = await this.ProductRepository.findById( productId );

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    product.isActive = false;

    await this.ProductRepository.save(product);
  }

  async addNewProduct(productData: any): Promise<any> {
    // adminId-token מקבל מה
    if (!this.userHasBusinessManagerPermission(adminId)) {
      throw new ForbiddenException('Insufficient permissions to add a new product.');
    }
    const savedProduct = await this.ProductRepository.create(productData);

    return savedProduct;
  }

  

  async updateProduct(ProductId: string, updatedFields: any): Promise<any> {
    // adminId-token
    const product = await this.ProductRepository.findById({ProductId,isActive:true});

    if (!product) 
      throw new NotFoundException('Product not found.');
    
    if (product.adminId !== adminId) 
      throw new ForbiddenException('You are not authorized to update this product.');

    Object.assign(product, updatedFields);
    const updatedProduct=await this.ProductRepository.save(product);
    return updatedProduct;
  }


  async updateProductDiscount(newSalePercentage: number): Promise<void> {
    // adminId-token
    if (!this.userHasBusinessManagerPermission(adminId)) 
      throw new ForbiddenException('Insufficient permissions to update products.');

    const managerProducts = await this.ProductRepository.find({ adminId ,isActive:true});
    await Promise.all(managerProducts.map(async (product: any) => {
      product.salePercentage = newSalePercentage;
      return this.ProductRepository.save(product);
    }));
  }

  
  private userHasBusinessManagerPermission(adminId: string): boolean {
    //פה צריך לבדוק האם למשתמש יש הרשאה מהמנהל
    return true

  }
}







