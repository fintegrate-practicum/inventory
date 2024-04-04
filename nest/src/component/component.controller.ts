import { Controller,Param,Delete, Post, Put,Body } from '@nestjs/common';
import { ComponentService } from './component.service';

@Controller('api/inventory/component')
export class ComponentController {
    constructor(private readonly componentService: ComponentService) {}

 @Delete(':componentId')
  async softDeleteComponent(@Param('componentId') componentId: string, eraserId: string) {
    await this.componentService.softDeleteComponent(componentId, eraserId);
    return { message: 'Component soft deleted successfully' };
  } 

  @Post()
  async addNewProvider(@Body()newComponent:any,userId:string){
    await  this.componentService.addNewComponent(newComponent,userId);
    return { message: 'Component  added successfully' };
  }
  @Put(':componentId')
  
  updateStockQuantityupdateStockQuantity(@Param('componentId') componentId: string,newQuantity: number, userId: string){
return this.componentService.updateStockQuantity(componentId,newQuantity,userId);
  }

}
