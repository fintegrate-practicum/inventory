import { Injectable, ForbiddenException, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { Component } from './component.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as Joi from '@hapi/joi';
import {componentValidationSchema} from "./component.validate"

// /////////////// for example only/////////////////////////
@Injectable()
export class ComponentService {

  constructor(@InjectModel(Component.name) private readonly componentModel: Model<Component>) { }

    async addNewComponent(ComponentData:any,adminId:string): Promise<any> {
        if (!this.userHasBusinessManagerPermission(adminId)) {//אמור לשלוף אותו מהטוקן
        throw new ForbiddenException('Insufficient permissions to add a new component.');
      }
       await this.validateComponent(ComponentData)
       await this.validateParams(ComponentData) //בדיקה האם אין רכיב בשם זה
      let newComponent = this.componentModel.create({...ComponentData,isActive:true});
      return newComponent;
     
    }
      //פונקציה לולידציות על הקלט
      private async validateParams(newComponent:Component) {
      let sameComponent=await this.componentModel.findOne({componentName:newComponent.componentName,isActive:true})
      if(sameComponent)
        throw new ConflictException('there is already same component');
      }

  async getAllComponents(): Promise<Component[]> {
    // adminId-token
    const components = await this.componentModel.find({ isActive: true });
    return components;
  }

  async getComponentById(componentId: string): Promise<Component> {
    const component = await this.componentModel.findOne({ isActive: true, id: componentId });

    if (!component)
      throw new NotFoundException('component not found.');

    return component;
  }

  async updateComponent(componentId: Types.ObjectId, updatedFields: any): Promise<Component> {
    await this.validateComponent(updatedFields)
    const component = await this.componentModel.findOneAndUpdate(
      { id: componentId, isActive: true },
      updatedFields,
      { new: true }
    );

    if (!component) {
      throw new NotFoundException('Component not found.');
    }

    return component;
  }

  async validateComponent(componentData: any): Promise<void> {
    const { error } = await componentValidationSchema.validateAsync(componentData);
    if (error) {
      throw new BadRequestException('Component data is invalid.', error.details.map(err => err.message));
    }
  }


  async softDeleteComponent(componentId: Types.ObjectId, adminId: string): Promise<void> {
    const component = await this.componentModel.findOne({ id: componentId });

    if (!component) {
      throw new NotFoundException('Component not found');
    }

    //eraserId=לקבל מהtoken
    if (component.adminId !== adminId) {
      throw new Error('User does not have permission to delete this component');
    }

    component.isActive = false;
    await this.componentModel.create(component);
  }

  private async checkComponentOrderedByUser(componentId: string): Promise<boolean> {
    //פה צריך לבדוק האם המשתמש הזמין את ההזמנה
    return true;
  }
  public userHasBusinessManagerPermission(adminId: string): boolean {
    //  פה צריך לבדוק האם למנהל יש  הרשאת גישה  מהמנהל
    return true;
  }

}


