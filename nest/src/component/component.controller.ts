import { Controller, Param, Delete, Post, Put, Body, Get, Headers } from '@nestjs/common';
import { ComponentService } from './component.service';
import { Component } from './component.entity';
import { Types } from 'mongoose';

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
      console.log("controller component");
      await this.componentService.addNewComponent(newComponent, token);
      return { message: 'Component  added successfully' };
    }
    catch (err) {
      console.log("cannot add !!" + err);
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
