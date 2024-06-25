import { Controller, Delete, Get, Param, Put, Post,Body ,Headers} from '@nestjs/common';
import { ProductService } from './products.service';
import { Product } from './product.entity';

@Controller('api/inventory/product/')
export class ProductsController {
    constructor(private readonly ProductsService: ProductService) { }
    
    @Get(':productId')
    getProductById(@Param('productId') productId: string) {
        return this.ProductsService.getProductById(productId);
    }

    @Get()
    getAllProducts() {
        return this.ProductsService.getAllProducts();
    }

    @Put('sale/')
    updateProductDiscount(@Headers('x-access-token') token:string,@Body() newSalePercentage: number) {
        return this.ProductsService.updateProductDiscount(newSalePercentage,token);
    }
    @Put(':productId')
    updateProduct(@Headers('x-access-token') token:string,@Param('productId') productId: string,@Body() updatedFields: any) {
        return this.ProductsService.updateProduct(productId,updatedFields,token);
    }

    @Post()
    async addNewProduct(@Headers('x-access-token') token:string,@Body() newProduct: Product) {
        await this.ProductsService.addNewProduct(newProduct,token);
        return { message: 'Product added succefully' };
    }

    @Delete(':productId')
    async softDeleteProduct(@Param('productId') productId: string) {
        await this.ProductsService.softDeleteProduct(productId);
        return { message: 'Product soft deleted successfully' };
    }

}

