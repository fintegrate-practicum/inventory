import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ComponentController } from './component.controller';
import { ComponentService } from './component.service';
import { Component, ComponentSchema } from './component.entity';
import { CustomField, CustomFieldSchema } from '../entities/customField.entity';
import { Variant, VariantSchema } from '../entities/variant.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Component.name, schema: ComponentSchema },
      { name: Variant.name, schema: VariantSchema },
      { name: CustomField.name, schema: CustomFieldSchema },
    ]),
  ],
  controllers: [ComponentController],
  providers: [ComponentService],
})
export class ComponentModule {}
