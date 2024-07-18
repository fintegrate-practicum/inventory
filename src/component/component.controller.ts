import { Controller, Post, Body, Headers, Delete, Put, Get, HttpException, HttpStatus, ValidationPipe, Param, BadRequestException } from '@nestjs/common';
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
    await this.componentService.addNewComponent(newComponent, token);//שליחה לפונקציה של Service
    return { message: 'component added succesfully' };
  }

  @Put(':componentId')
  async updateComponent(
    @Param('componentId') componentId: string,
    @Body() updatedFields: any,
  ): Promise<Component> {
    const objectId = this.convertToObjectId(componentId);
    return await this.componentService.updateComponent(objectId, updatedFields);
  }

  @Get()
  getAllComponents() {
    return this.componentService.getAllComponents();
  }
  @Get(':componentId')
  getComponentById(@Param('componentId') componentId: string) {
    return this.componentService.getComponentById(componentId);
  }

  private convertToObjectId(id: string): Types.ObjectId {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ObjectId format');
    }
    return new Types.ObjectId(id);
  }

}
