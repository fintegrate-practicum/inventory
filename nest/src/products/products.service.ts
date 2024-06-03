
import { Product } from '../entities/Product';
import { Injectable, NotFoundException, BadRequestException, ForbiddenException, ConflictException } from '@nestjs/common';
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

 
  async addNewProduct(productData: any,adminId:string): Promise<any> {
   if (!this.userHasBusinessManagerPermission(adminId)) 
      throw new ForbiddenException('Insufficient permissions to add a new product.');

    let sameName = await this.productRepository.findOne({where:{ productName: productData.productName, isActive: true} })
    if (sameName) {
      throw new ConflictException('a product with the same name already exists');
    }


    checkSameProduct(productData);
    async function checkSameProduct(product: Product) {
      const existingProduct = await this.productRepository.collection('products').findOne({
        components: { $all: product.productComponents },
        "components.quantity": { $all: product.productComponents.map(component => component.quantity) }
      });
      if (existingProduct) {
        throw new ConflictException('A product with the same components and quantities already exists');
      }
    }
    
    if (productData.components.length < 2 && !productData.components.some((component: any) => component.quantity >= 2)) {
      throw new BadRequestException('A product must have at least two components or one component with at least two quantities.');
    }

    const newProduct = this.productRepository.create(productData);
    const savedProduct = await this.productRepository.save(newProduct);

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






