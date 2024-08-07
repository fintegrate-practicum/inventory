import { Controller, Delete, Get, Param, Put, Post, Body, Headers, BadRequestException, NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { Types } from 'mongoose';

@Controller('api/inventory/product')
export class ProductController {
    constructor(private readonly productsService: ProductService) { }

    @Get(':productId')
    async getProductById(@Param('productId') productId: string) {
        try {
            const product = await this.productsService.getProductById(productId);
            if (!product) {
                throw new NotFoundException('Product not found');
            }
            return product;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Get(':buisnessId')
    async getAllProducts(
        @Param('buisnessId') buisnessId: string
    ) {
        return await this.productsService.getProductByBusinessId(buisnessId);
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
