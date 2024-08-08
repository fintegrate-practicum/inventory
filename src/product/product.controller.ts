import { Controller, Delete, Get, Param, Put, Post, Body, Headers, BadRequestException, NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { Types } from 'mongoose';

@Controller('api/inventory/product')
export class ProductController {
    constructor(private readonly productsService: ProductService) { }

    @Get(':idOrBusiness')
    async getProductOrProducts(@Param('idOrBusiness') idOrBusiness: string) {
        if (Types.ObjectId.isValid(idOrBusiness)) {
            const product = await this.productsService.getProductById(new Types.ObjectId(idOrBusiness));
            if (!product) {
                throw new NotFoundException('Product not found');
            }
            return product;
        } else {
            const products = await this.productsService.getProductByBusinessId(idOrBusiness);
            return products;
        }
    }

    @Put('sale')
    async updateProductDiscount(@Headers('x-access-token') token: string, @Body() body: { newSalePercentage: number }) {
        const { newSalePercentage } = body;
        return await this.productsService.updateProductDiscount(newSalePercentage, token);
    }

    @Put(':productId')
    async updateProduct(
        @Param('productId') productId: string,
        @Body() updatedFields: any,
    ): Promise<Product> {
        const objectId = this.convertToObjectId(productId);
        return await this.productsService.updateProduct(productId, updatedFields);
    }

    @Post()
    async addNewProduct(@Headers('x-access-token') token: string, @Body() newProduct: Product) {
        try {
            const createdProduct = await this.productsService.addNewProduct(newProduct, token);
            return { message: 'Product added successfully', product: createdProduct };
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }

    @Delete(':productId')
    async softDeleteProduct(@Param('productId') productId: string) {
        try {
            await this.productsService.softDeleteProduct(productId);
            return { message: 'Product soft deleted successfully' };
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    private convertToObjectId(id: string): Types.ObjectId {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid ObjectId format');
        }
        return new Types.ObjectId(id);
    }
}
