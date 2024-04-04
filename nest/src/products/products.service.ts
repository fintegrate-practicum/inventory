
  
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';

@Injectable()
export class ProductService {
  
  constructor(private readonly ProductRepository: ProductRepository) {}

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

    
    const newProduct = this.productRepository.create(productData);

   
    const savedProduct = await this.productRepository.save(newProduct);

    return savedProduct;
  }
  async getProductsByManagerId(managerId: string): Promise<Product[]> {
    const products = await this.productRepository.find({ where: { managerId: managerId } });

    if (!products || products.length === 0) {
      throw new NotFoundException('No products found for the provided manager ID.');
    }

    return products;
  }
  async updateProductOfAdmin(managerId: string, newSalePercentage: number, userId: string): Promise<void> {
    
    if (!userHasBusinessManagerPermission(userId)) {
      throw new ForbiddenException('Insufficient permissions to update products.');
    }

    
    const managerProducts = await this.productRepository.find({ where: { managerId } });

    
    await Promise.all(managerProducts.map(async (product) => {
      product.salePercentage = newSalePercentage;
      return this.productRepository.save(product);
    }));
  }
 


  async getProductsForSaleByCompany(companyId: string): Promise<any[]> {
    const products = await this.productRepository.find({
      where: { companyId: companyId, stockQuantity: MoreThan(0) },
      select: ['productName', 'price', 'description', 'isOnSale', 'salePercentage', 'stockQuantity'],
    });

    if (!products || products.length === 0) {
      throw new NotFoundException('No products available for sale for the provided company ID.');
    }

    return products;
  }
  private userHasBusinessManagerPermission(userId: string): boolean {
    //פה צריך לבדוק האם למשתמש יש הרשאה מהמנהל
    return true

  }
}


  




