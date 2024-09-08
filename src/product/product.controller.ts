import {
    Controller,
    Delete,
    Get,
    Param,
    Put,
    Post,
    Body,
    Headers,
    BadRequestException,
    HttpStatus,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { Types } from 'mongoose';
import { Res } from '@nestjs/common';
import { Logger } from '@nestjs/common';

@Controller('api/inventory/product')
export class ProductController {
    private readonly logger = new Logger(ProductController.name);

    constructor(private readonly productsService: ProductService) { }

    @Get(':productId')
    async getProductById(@Param('productId') productId: string) {
        const product = await this.productsService.getProductById(productId);
        return product;
    }

    @Get('businessId/:businessId')
    async getAllProducts(@Param('businessId') businessId: string) {
        return await this.productsService.getProductByBusinessId(businessId);
    }

    @Put('sale')
    async updateProductDiscount(
        @Headers('x-access-token') token: string,
        @Body() body: { newSalePercentage: number },
    ) {
        const { newSalePercentage } = body;
        return await this.productsService.updateProductDiscount(newSalePercentage, token);
    }

    @Put(':productId')
    async updateProduct(
        @Param('productId') productId: string,
        @Body() updatedFields: any,
    ): Promise<Product> {
        const objectId = this.convertToObjectId(productId);
        return await this.productsService.updateProduct(objectId, updatedFields);
    }

    @Post()
    async addNewProduct(
        @Headers('x-access-token') token: string,
        @Body() newProduct: Product,
    ) {
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

    @Get('low-stock/:businessId')
    async getLowStockProducts(
        @Param('businessId') businessId: string,
        @Res() response
    ): Promise<void> {
        try {
            const result = await this.productsService.getLowStockProducts(businessId);
            response.status(HttpStatus.OK).json(result);
        } catch (error) {
            this.logger.error('Failed to get result', error.stack);
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                title: 'Failed to get result',
                content: error.message,
            });
        }
    }
}
