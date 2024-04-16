import { Controller, Delete, Get, Param, Put, Post,Body } from '@nestjs/common';
import { ProductsService } from './products.service';


@Controller('api/inventory/product/')
export class ProductsController {
    constructor(private readonly ProductsService: ProductsService) { }
    
    @Get(':businessId')
    getAllPrductByBusinessId(@Param('businessId') businessId: string) {
        return this.ProductsService.getAllProductsByBusinessId(businessId);
    }

    @Get('one/:productId')
    getProductById(@Param('productId') productId: string) {
        return this.ProductsService.getProductById(productId);
    }

    @Get('admin/')
    getProductsByAdminId() {
        return this.ProductsService.getProductsByAdminId();
    }

    @Put('sale/')
    updateProductDiscount(@Body() newSalePercentage: number) {
        return this.ProductsService.updateProductDiscount(newSalePercentage);
    }
    @Put(':productId')
    updateProduct(@Param('productId') productId: string,@Body() updatedFields: any) {
        return this.ProductsService.updateProduct(productId,updatedFields);
    }

    @Post()
    async addNewProduct(@Body() newProduct: any) {
        await this.ProductsService.softDeleteProduct(newProduct);
        return { message: 'Product soft deleted successfully' };
    }

    @Delete(':productId')
    async softDeleteProduct(@Param('productId') productId: string) {
        await this.ProductsService.softDeleteProduct(productId);
        return { message: 'Product soft deleted successfully' };
    }

}

