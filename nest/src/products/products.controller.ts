import { Controller,Delete,Get ,Param,Put,Post} from '@nestjs/common';
import { ProductsService } from './products.service';


@Controller('api/inventory/product')
export class ProductsController {
    constructor(private readonly ProductsService: ProductsService) {}
@Get(':businessId')
getAllPrductByBusinessId(@Param('businessId') businessId: string){
    return this.ProductsService.getAllProductsByBusinessId(businessId);
}
@Get('/admin:adminId')
getProductsByManagerId(@Param('adminId') adminId:string){
    return this.ProductsService.getProductsByManagerId(adminId);
}

@Put('sale/:adminId')
updateProductOfAdmin(@Param('userId') userId:string){
    return this.ProductsService.updateProductOfAdmin(userId);
}


@Post()
async addNewProduct( newProduct: any,userId:string) {
    await this.ProductsService.softDeleteProduct(newProduct,userId);
    return { message: 'Product soft deleted successfully' };
  }

@Delete(':productId')
async softDeleteProduct(@Param('productId') productId: string) {
  await this.ProductsService.softDeleteProduct(productId);
  return { message: 'Product soft deleted successfully' };
}

}

