

import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';

@Injectable()
export class ProductService {

  constructor(private readonly ProductRepository: ProductRepository) { }

  async softDeleteProduct(productId: string): Promise<void> {

    const product = await this.ProductRepository.findOne({ id: productId });

    if (!product) {
      throw new NotFoundException('Product not found.');
    }


    product.status = 'inactive';


    await this.ProductRepository.save(product);
  }
  async addNewProduct(productData: any, userId: string): Promise<any> {

    if (!userHasBusinessManagerPermission(userId)) {
      throw new ForbiddenException('Insufficient permissions to add a new product.');
    }


    const newProduct = this.ProductRepository.create(productData);


    const savedProduct = await this.ProductRepository.save(newProduct);

    return savedProduct;
  }
  async getProductsByManagerId(managerId: string): Promise<any[]> {
    const products = await this.ProductRepository.find({ where: { managerId: managerId } });

    if (!products) {
      throw new NotFoundException('No products found for the provided manager ID.');
    }

    return products;
  }
  async updateProductOfAdmin(managerId: string, newSalePercentage: number, userId: string): Promise<void> {

    if (!userHasBusinessManagerPermission(userId)) {
      throw new ForbiddenException('Insufficient permissions to update products.');
    }


    const managerProducts = await this.ProductRepository.find({ where: { managerId } });


    await Promise.all(managerProducts.map(async (product) => {
      product.salePercentage = newSalePercentage;
      return this.ProductRepository.save(product);
    }));
  }


  async getProductById(ProductId: string): Promise<any[]> {
    const product = await this.ProductRepository.find({
      where: { ProductId: ProductId },
      select: ['productName', 'price', 'description', 'isOnSale', 'salePercentage', 'stockQuantity'],
    });

    if (!product) {
      throw new NotFoundException('product not found.');
    }

    return product;
  }
  async getProductsForSaleByCompany(companyId: string): Promise<any[]> {
    const products = await this.ProductRepository.find({
      where: { companyId: companyId, stockQuantity: MoreThan(0) },
      select: ['productName', 'price', 'description', 'isOnSale', 'salePercentage', 'stockQuantity'],
    });

    if (!products) {
      throw new NotFoundException('No products available for sale for the provided company ID.');
    }

    return products;
  }
  private userHasBusinessManagerPermission(userId: string): boolean {
    //פה צריך לבדוק האם למשתמש יש הרשאה מהמנהל
    return true

  }
}







