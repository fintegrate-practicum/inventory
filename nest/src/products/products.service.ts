
import { Injectable, NotFoundException, BadRequestException, ForbiddenException, ConflictException } from '@nestjs/common';
import Product from "./entites"
@Injectable()
export class ProductService {

  constructor(private readonly Product: Product) { }

  async getAllProducts(): Promise<any[]> {
    // adminId-token
    const products = await this.Product.find({ isActive: true, adminId });

    return products;
  }


  async getProductById(ProductId: string): Promise<any[]> {
    const product = await this.Product.findById({ ProductId, isActive: true });

    if (!product)
      throw new NotFoundException('product not found.');
    return product;
  }


  async getProductBybussinessId(businessId: string): Promise<any[]> {
    const products = await this.Product.find({ businessId, isActive: true });
    return products;
  }

  async softDeleteProduct(productId: string): Promise<void> {
    // adminId-token
    const product = await this.Product.findById(productId);

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    product.isActive = false;

    await this.Product.save(product);
  }


  async addNewProduct(productData: any, userId: string): Promise<any> {
    if (!this.userHasBusinessManagerPermission(userId))
      throw new ForbiddenException('Insufficient permissions to add a new product.');

    let sameName = await Product.findOne({ productName: productData.productName, company: productData.company })
    if (sameName) {
      throw new ConflictException('a product with the same name already exists');
    }

    //בדיקה שאין מוצר בהרכב זהה כמו שהתקבל כעת
    //אני מניחה (צריך לעדכן את הנוגעים בדבר) שמערך של רכיבים ממוין לפי הid של הרכיבים
    //כך שלא יכול להיות שיהיה לי שתי מוצרים זהים שהסדר במערך שלהם הוא שונה
    // ואין צורך להכנס למוצר שבתוך מוצר כיוון שגם למוצר יש id ייחודי וזה פותר לי את זה


    //כשמוחזר כאן השקר הכוונה היא שהם לא מוצרים זהים
    //     const checkSameProduct = (product: Product): boolean => {
    //       if (product.price == productData.price) {
    //         for (let i = 0; i < productData.components.length; i++)//עד איזה אורך ללכת מי קצר יותר?
    //           if (productData.components[i].id !== product.components[i].id ||
    //             productData.components[i].quantity !== product.components[i].quantity)
    //             return false;
    //         return true;
    //       }
    //       return false;


    //     }
    //     let sameProduct = await Product.find()

    //     for (let i = 0; i < sameProduct.length; i++) {
    //       if(checkSameProduct(sameProduct[i]))
    //         throw new ConflictException('A product with the same components and quantities already exists.');
    // }



    checkSameProduct(productData);
    async function checkSameProduct(product: Product) {
      const existingProduct = await Product.collection('products').findOne({
        components: { $all: product.components },
        "components.quantity": { $all: product.components.map(component => component.quantity) }
      });
      if (existingProduct) {
        throw new ConflictException('A product with the same components and quantities already exists');
      }
    }
    if (productData.components.length < 2 && !productData.components.some((component: any) => component.quantity >= 2)) {
      throw new BadRequestException('A product must have at least two components or one component with at least two quantities.');
    }

    const newProduct = this.Product.create(productData);
    const savedProduct = await this.Product.save(newProduct);

    return savedProduct;
  }


  async updateProduct(ProductId: string, updatedFields: any): Promise<any> {
    // adminId-token
    const product = await this.Product.findById({ ProductId, isActive: true });

    if (!product)
      throw new NotFoundException('Product not found.');

    if (product.adminId !== adminId)
      throw new ForbiddenException('You are not authorized to update this product.');

    Object.assign(product, updatedFields);
    const updatedProduct = await this.Product.save(product);
    return updatedProduct;
  }


  async updateProductDiscount(newSalePercentage: number): Promise<void> {
    // adminId-token
    if (!this.userHasBusinessManagerPermission(adminId))
      throw new ForbiddenException('Insufficient permissions to update products.');

    const managerProducts = await this.Product.find({ adminId, isActive: true });
    await Promise.all(managerProducts.map(async (product: any) => {
      product.salePercentage = newSalePercentage;
      return this.Product.save(product);
    }));
  }


  private userHasBusinessManagerPermission(adminId: string): boolean {
    //פה צריך לבדוק האם למשתמש יש הרשאה מהמנהל
    return true

  }
}







