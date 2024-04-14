import { Controller, Param, Delete, Post, Put, Body, Get } from '@nestjs/common';
import { ComponentService } from './component.service';

@Controller('api/inventory/component')
export class ComponentController {

  constructor(private readonly componentService: ComponentService) { }

  @Delete(':componentId')
  async softDeleteComponent(@Param('componentId') componentId: string, userId: string) {
    await this.componentService.softDeleteComponent(componentId, userId);
    return { message: 'Component soft deleted successfully' };
  }

  @Post()
  async addNewProvider(@Body() newComponent: any, userId: string) {
    await this.componentService.addNewComponent(newComponent, userId);
    return { message: 'Component  added successfully' };
  }

  @Put('/Quantity:componentId')
  updateStockQuantity(@Param('componentId') componentId: string, newQuantity: number, userId: string) {
    return this.componentService.updateStockQuantity(componentId, newQuantity, userId);
  }

  @Put(':componentId')
  updateComponent(@Param('componentId') componentId: string, updatedFields: any, userId: string) {
    return this.componentService.updateComponent(componentId, updatedFields, userId);
  }

  @Get(':bussinesId')
  getAllComponents(@Param('bussinesId') bussinesId: string) {
    return this.componentService.getAllComponents(bussinesId);
  }

}
