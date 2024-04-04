import { Controller,Param,Delete, Post, Put } from '@nestjs/common';

@Controller('component')
export class ComponentController {
    constructor(private readonly componentService: componentService) {}

 @Delete(':componentId')
  async softDeleteComponent(@Param('componentId') componentId: string, eraserId: string) {
    await this.componentService.softDeleteComponent(componentId, eraserId);
    return { message: 'Component soft deleted successfully' };
  } 

  @Post()
  async addNewProvider(@Body()newComponent:any){
    await  this.componentService.addNewComponent(newComponent);
    return { message: 'Component  added successfully' };
  }
  @Put(':componentId')
  
  updateStockQuantityupdateStockQuantity(@Param('componentId') componentId: string,newQuantity: number, userId: string){
return this.componentService.updateStockQuantity();
  }

}
