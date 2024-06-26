import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ComponentController } from './component.controller';
import { ComponentService } from './component.service';
import { Component, ComponentSchema } from './component.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Component.name, schema: ComponentSchema }]),],
  controllers: [ComponentController],
  providers: [ComponentService],
})
export class ComponentModule { }
