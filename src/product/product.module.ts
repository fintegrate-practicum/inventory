import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product, ProductSchema } from './product.entity';
import { CustomField, CustomFieldSchema } from '../entities/customField.entity';
import { Variant, VariantSchema } from '../entities/variant.entity';
import { RabbitPublisherModule } from 'src/rabbit-publisher/rabbit-publisher.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Variant.name, schema: VariantSchema },
      { name: CustomField.name, schema: CustomFieldSchema },
    ]),
    RabbitPublisherModule
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
