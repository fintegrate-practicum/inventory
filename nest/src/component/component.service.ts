import { Injectable, ForbiddenException, BadRequestException, NotFoundException } from '@nestjs/common';


@Injectable()
export class ComponentService {

  constructor(private readonly componentRepository: componentRepository) { }


  async addNewComponent(elementData: any): Promise<any> {
// adminId-token
    if (!this.userHasBusinessManagerPermission(adminId)) {
      throw new ForbiddenException('Insufficient permissions to add a new site element.');
    }


    if (!elementData.componentName || !elementData.componentBuyPrice ||!elementData.minQuantity) {
      throw new BadRequestException('Mandatory fields missing for adding a new site element.');
    }
    const savedElement = await this.componentRepository.create(elementData);

    return savedElement;
  }

  async getAllComponents(): Promise<any[]> {
    // adminId-token
    const components = await this.componentRepository.find({ isActive: true,adminId:adminId});
    return components;
  }
  
  async getComponentById(componentId: string): Promise<any[]> {
    const component = await this.ProductRepository.findById({isActive: true,_id:componentId} );
  
    if (!component) 
      throw new NotFoundException('component not found.');

    return component;
  }
  

  async updateComponent(componentId: string, updatedFields: any): Promise<any> {

    const component = await this.componentRepository.findOne({_id:componentId,isActive:true});


    if (!component) {
      throw new NotFoundException('component not found.');
    }
    if (!component.isActive) {
      throw new NotFoundException('component is deleted.');
    }

    if (component.adminId !== adminId) {
      throw new ForbiddenException('You are not authorized to update this component.');
    }
//משנה את השדות שכבר קיימים לפי הערכים החדשים ושדות שלא קיימים - מוסיף אותם
//אין אבטחה לגבי השדות החדשים שמוסיף
    Object.assign(component, updatedFields);

    const updatedComponent=await this.componentRepository.save(component);
    return updatedComponent;
  }
  
 async softDeleteComponent(componentId: string): Promise<void> {
    const component = await this.componentRepository.findById(componentId);

    if (!component) {
      throw new NotFoundException('Component not found');
    }

    //eraserId=לקבל מהtoken
    if (component.adminId !== adminId) {
      throw new Error('User does not have permission to delete this component');
    }

    component.isActive = false;
    await this.componentRepository.save(component);
  }


  private async checkComponentOrderedByUser(componentId: string): Promise<boolean> {
    //פה צריך לבדוק האם המשתמש הזמין את ההזמנה
    return true;
  }
  private userHasBusinessManagerPermission(adminId: string): boolean {
    //  פה צריך לבדוק האם למנהל יש  הרשאת גישה  מהמנהל
    return true;
  }

}


