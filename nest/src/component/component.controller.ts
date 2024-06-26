import { Controller, Post, Body, Headers,Delete,Put,Get, HttpException, HttpStatus, ValidationPipe,Param } from '@nestjs/common';
import { ComponentService } from './component.service';
import { Component } from './component.entity';
import { Types } from 'mongoose';
import * as Joi from '@hapi/joi';
import {componentValidationSchema} from "./component.validate"


@Controller('api/inventory/component')
export class ComponentController {

  constructor(private readonly componentService: ComponentService) { }

  @Delete(':componentId')
  async softDeleteComponent(@Headers('x-access-token') token: string, @Param('componentId') componentId: Types.ObjectId) {
    await this.componentService.softDeleteComponent(componentId, token);
    return { message: 'Component soft deleted successfully' };
  }

  @Post()
  async addNewComponent(@Headers('x-access-token') token: string, @Body() newComponent: Component) {
    try {
      componentValidationSchema.validate(newComponent);//בדיקה ע"י סכמה joi
      await this.componentService.addNewComponent(newComponent, token);//שליחה לפונקציה של Service
      return { message: 'component added succesfully' };
    } 
    catch (err) {
      if (err instanceof Joi.ValidationError) {//בדיקה האם השגיאה קשורה לולידציה של הקלט
        const errors = err.details.map((detail) => ({
          path: detail.path.join('.'),
          message: detail.message,
        }));
        throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
      } 
      else {
        console.error('Error adding component:', err);
        throw new HttpException('Error adding component', HttpStatus.BAD_REQUEST);
      }
    }
  }
  
  @Put(':componentId')
  updateComponent(@Headers('x-access-token') token: string, @Param('componentId') componentId: Types.ObjectId, updatedFields: any) {
    return this.componentService.updateComponent(componentId, updatedFields, token);
  }

  @Get()
  getAllComponents() {
    return this.componentService.getAllComponents();
  }
  @Get(':componentId')
  getComponentById(@Param('componentId') componentId: string) {
    return this.componentService.getComponentById(componentId);
  }

}
