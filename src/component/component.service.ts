import {
  Injectable,
  ForbiddenException,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Component } from './component.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { componentValidationSchema } from './component.validate';

@Injectable()
export class ComponentService {
  constructor(
    @InjectModel(Component.name) private readonly componentModel: Model<Component>,
  ) {}

  async addNewComponent(componentData: any, adminId: string): Promise<Component> {
    if (!this.userHasBusinessManagerPermission(adminId)) {
      throw new ForbiddenException('Insufficient permissions to add a new component.');
    }

    await this.validateComponent(componentData);
    await this.validateParams(componentData); // Check if a component with this name exists

    const newComponent = new this.componentModel(componentData);
    await newComponent.save();
    return newComponent;
  }

  private async validateParams(componentData: any): Promise<void> {
    const sameComponent = await this.componentModel.findOne({
      name: componentData.name,
      isActive: true,
    });
    if (sameComponent) {
      throw new ConflictException('A component with this name already exists.');
    }
  }

  async getAllComponents(businessId: string): Promise<Component[]> {
    // adminId-token
    const components = await this.componentModel.find({ businessId, isActive: true });
    return components;
  }

  async getComponentById(componentId: string): Promise<Component> {
    const component = await this.componentModel.findOne({
      isActive: true,
      _id: componentId,
    });

    if (!component) {
      throw new NotFoundException('Component not found.');
    }

    return component;
  }

  async updateComponent(
    componentId: Types.ObjectId,
    updatedFields: any,
  ): Promise<Component> {
    await this.validateComponent(updatedFields);

    const component = await this.componentModel.findOneAndUpdate(
      { _id: componentId, isActive: true },
      updatedFields,
      { new: true },
    );

    if (!component) {
      throw new NotFoundException('Component not found.');
    }

    return component;
  }

  async validateComponent(componentData: any): Promise<void> {
    const { error } = await componentValidationSchema.validateAsync(componentData);
    if (error) {
      throw new BadRequestException(
        'Component data is invalid.',
        error.details.map((err) => err.message),
      );
    }
  }

  async softDeleteComponent(componentId: Types.ObjectId, adminId: string): Promise<void> {
    const component = await this.componentModel.findOne({ _id: componentId });

    if (!component) {
      throw new NotFoundException('Component not found.');
    }

    // Check if the user has permission to delete the component
    if (component.adminId !== adminId) {
      throw new ForbiddenException(
        'User does not have permission to delete this component.',
      );
    }

    // Soft delete by updating the isActive field
    component.isActive = false;
    await component.save();
  }

  // private async checkComponentOrderedByUser(componentId: string): Promise<boolean> {
  //   // Implementation to check if the component has been ordered by the user
  //   return true;
  // }

  public userHasBusinessManagerPermission(adminId: string): boolean {
    console.log(adminId);
    // Implementation to check if the user has business manager permission
    return true;
  }
}
