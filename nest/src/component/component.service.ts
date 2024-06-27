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
      try{ 
        if (!this.userHasBusinessManagerPermission(adminId)) {//אמור לשלוף אותו מהטוקן
        throw new ForbiddenException('Insufficient permissions to add a new component.');
      }
      componentValidationSchema.validate(ComponentData);//בדיקה ע"י סכמה joi
       await this.validateParams(ComponentData) //בדיקה האם אין רכיב בשם זה
      let newComponent = this.componentModel.create({...ComponentData,isActive:true});
      return newComponent;
      }
      catch(err){
        if (err instanceof Joi.ValidationError) {//בדיקה האם השגיאה קשורה לולידציה של הקלט
          const errors = err.details.map((detail) => ({
            path: detail.path.join('.'),
            message: detail.message,
          }));
          throw new BadRequestException({ errors } );
        } 
        console.log(err);
        throw new ConflictException('service component sorry cannot add component');
      }}
      //פונקציה לולידציות על הקלט
      private async validateParams(newComponent:Component) {
        try{
          let sameComponent=await this.componentModel.findOne({componentName:newComponent.componentName,isActive:true})
      if(sameComponent)
        throw new ConflictException('there is already same component');
         
        }
        catch(err){ 
          console.log(err);
          throw new ConflictException('validateParams-sorry Something went wrong cannot add component');
      
          }  
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

  async updateComponent(componentId: Types.ObjectId, updatedFields: any, adminId: string): Promise<Component> {

    const component = await this.componentModel.findOne({ id: componentId, isActive: true });

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

    const updatedComponent = await this.componentModel.create(component);
    return updatedComponent;
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


