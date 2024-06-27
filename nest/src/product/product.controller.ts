import { Controller, Delete, Get, Param, Put, Post, Body, Headers } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { Types } from 'mongoose';

@Controller('api/inventory/product')
export class ProductController {
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
    updateProductDiscount(@Headers('x-access-token') token: string, @Body() newSalePercentage: number) {
        return this.ProductsService.updateProductDiscount(newSalePercentage, token);
    }

    @Put(':productId')
    async updateProduct(
        @Param('productId') productId: Types.ObjectId,
        @Body() updatedFields: any,
    ): Promise<Product> {
        await this.ProductsService.validateProduct(updatedFields);
        return await this.ProductsService.updateProduct(productId, updatedFields);
    }

    @Post()
    async addNewProduct(@Headers('x-access-token') token: string, @Body() newProduct: Product) {
        await this.ProductsService.addNewProduct(newProduct, token);
        return { message: 'Product added succefully' };
    }

    @Delete(':productId')
    async softDeleteProduct(@Param('productId') productId: string) {
        await this.ProductsService.softDeleteProduct(productId);
        return { message: 'Product soft deleted successfully' };
    }

}

