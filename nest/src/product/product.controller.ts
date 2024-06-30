import { Controller, Delete, Get, Param, Put, Post, Body, Headers, HttpException, HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('api/inventory/product')
export class ProductController {
    constructor(private readonly productsService: ProductService) { }

    @Get(':productId')
    getProductById(@Param('productId') productId: string) {
        return this.productsService.getProductById(productId);
    }

    @Get()
    getAllProducts() {
        return this.productsService.getAllProducts();
    }

    @Put('sale/')
    updateProductDiscount(@Headers('x-access-token') token: string, @Body() newSalePercentage: number) {
        return this.productsService.updateProductDiscount(newSalePercentage, token);
    }

    @Put(':productId')
    updateProduct(@Headers('x-access-token') token: string, @Param('productId') productId: string, @Body() updatedFields: any) {
        return this.productsService.updateProduct(productId, updatedFields, token);
    }

    @Post()
    async addNewProduct(@Headers('x-access-token') token: string, @Body() newProduct: Product) {
        try {
            await this.productsService.addNewProduct(newProduct, token);  
            return { message: 'Product added successfully' };
        }
        catch(err) {
            console.log(err);
        }
    }

    @Delete(':productId')
    async softDeleteProduct(@Param('productId') productId: string) {
        await this.productsService.softDeleteProduct(productId);
        return { message: 'Product soft deleted successfully' };
    }

}

