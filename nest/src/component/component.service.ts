import { Injectable, ForbiddenException, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { Component } from './component.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
// /////////////// for example only/////////////////////////
@Injectable()
export class ComponentService {

  constructor(@InjectModel(Component.name) private readonly componentModel: Model<Component>) { }

  async addNewComponent(elementData: Component, adminId: string): Promise<Component> {
    // adminId-token
    if (!this.userHasBusinessManagerPermission(adminId)) {
      throw new ForbiddenException('Insufficient permissions to add a new site element.');
    }

    if (!elementData.componentName || !elementData.componentBuyPrice || !elementData.minQuantity) {
      throw new BadRequestException('Mandatory fields missing for adding a new site element.');
    }
    const savedElement = await this.componentModel.create(elementData);

    return savedElement;
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


