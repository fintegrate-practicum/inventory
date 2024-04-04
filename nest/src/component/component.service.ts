import { Injectable ,ForbiddenException,BadRequestException,NotFoundException} from '@nestjs/common';
דד

@Injectable()
export class ComponentService { 



  private userHasBusinessManagerPermission(userId: string): boolean {
    //  פה צריך לבדוק האם למנהל יש  הרשאת גישה  מהמנהל
     return true;
   }
   
  constructor(private readonly componentRepository: componentRepository) {}

  async addNewComponent(elementData: any, userId: string): Promise<any> {
    
    if (!userHasBusinessManagerPermission(userId)) {
      throw new ForbiddenException('Insufficient permissions to add a new site element.');
    }

    
    if (!elementData.name || !elementData.price || !elementData.description || !elementData.minQuantity) {
      throw new BadRequestException('Mandatory fields missing for adding a new site element.');
    }

    const newElement = this.componentRepository.create(elementData);

    
    const savedElement = await this.componentRepository.save(newElement);

    return savedElement;
  }

  
  async updateStockQuantity(componentId: string, newQuantity: number, userId: string): Promise<void> {
    const component = await this.componentRepository.findOne(componentId);
    if (!component) {
      throw new NotFoundException('Component not found.');
    }


    const orderedByUser = await this.checkComponentOrderedByUser(componentId, userId);
    if (!orderedByUser) {
      throw new ForbiddenException('You are not authorized to update inventory for this component.');
    }

   
    component.stockQuantity = newQuantity;
    await this.componentRepository.save(component);
  }

  private async checkComponentOrderedByUser(componentId: string, userId: string): Promise<boolean> {
    //פה צריך לבדוק האם המשתמש הזמין את ההזמנה
    return true;
  }
  async softDeleteComponent(componentId: string, eraserId: string): Promise<void> {
    const component = await this.componentRepository.findOne(componentId);

    if (!component) {
      throw new NotFoundException('Component not found');
    }

   
    if (component.eraserId !== eraserId) {
      throw new Error('User does not have permission to delete this component');
    }

    
    component.isActive = false;
    await this.componentRepository.save(component);
  }
  
}


