import { Injectable, ForbiddenException, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { Component } from './component.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// /////////////// for example only/////////////////////////
@Injectable()
export class ComponentService {
 
  constructor(
   @InjectRepository(Component)
    private readonly componentRepository: Repository<Component>) { } 


  async addNewComponent(elementData: Component,adminId:string): Promise<any> {
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
    const components = await this.componentRepository.findBy({ isActive: true});
    return components;
  }
  
  async getComponentById(componentId: string): Promise<any[]> {
    const component = await this.componentRepository.findBy({isActive: true,id:componentId} );
  
    if (!component) 
      throw new NotFoundException('component not found.');

    return component;
  }
  

  async updateComponent(componentId: string, updatedFields: any,adminId:string): Promise<any> {

    const component = await this.componentRepository.findOneBy({id:componentId,isActive:true});


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
  
 async softDeleteComponent(componentId: string,adminId:string): Promise<void> {
    const component = await this.componentRepository.findOneBy({id:componentId});

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


