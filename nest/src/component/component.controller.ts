import { Controller, Param, Delete, Post, Put, Body, Get } from '@nestjs/common';
import { ComponentService } from './component.service';

@Controller('api/inventory/component')
export class ComponentController {

  constructor(private readonly componentService: ComponentService) { }

  @Delete(':componentId')
  async softDeleteComponent(@Param('componentId') componentId: string) {
    await this.componentService.softDeleteComponent(componentId);
    return { message: 'Component soft deleted successfully' };
  }

  @Post()
  async addNewProvider(@Body() newComponent: any) {
    await this.componentService.addNewComponent(newComponent);
    return { message: 'Component  added successfully' };
  }

  @Put(':componentId')
  updateComponent(@Param('componentId') componentId: string, updatedFields: any) {
    return this.componentService.updateComponent(componentId, updatedFields);
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
