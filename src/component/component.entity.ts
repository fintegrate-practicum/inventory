import { Length, Min, IsNotEmpty, ValidateIf, IsEmpty } from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema()
export class Component extends Document {
  @Prop({ type: SchemaTypes.ObjectId, required: true, auto: true })
  id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  @IsNotEmpty()
  @Length(3, 20, { message: 'Name must be between 3 and 20 letters' })
  name: string;

  @Prop({ required: true })
  @IsNotEmpty()
  @Min(1, { message: 'Price must be more than 1' })
  componentBuyPrice: number;

  @Prop({ required: true })
  addingComponentDate: Date = new Date();

  @Prop({ required: true })
  @IsNotEmpty()
  @Min(1, { message: 'Minimum quantity must be positive' })
  minQuantity: number;

  @Prop({ required: true })
  @Min(0, { message: 'Stock must be positive' })
  stockQuantity: number;

  @Prop({ required: true })
  isActive: boolean = false;

  @Prop({ required: true })
  @IsNotEmpty()
  adminId: string;

  @Prop({ required: true })
  isSoldSeparately: boolean = false;

  @Prop({ requiredIf: (component: Component) => component.isSoldSeparately })
  @ValidateIf((entity) => entity.isSoldSeparately)
  @IsNotEmpty()
  description: string;

  @Prop({ requiredIf: (component: Component) => component.isSoldSeparately })
  @ValidateIf((entity) => entity.isSoldSeparately)
  @IsNotEmpty()
  totalPrice: number;

  @Prop({ requiredIf: (component: Component) => component.isSoldSeparately })
  @ValidateIf((entity) => entity.isSoldSeparately)
  @IsNotEmpty()
  images: string[];

  @Prop({ requiredIf: (component: Component) => component.isSoldSeparately })
  @ValidateIf((entity) => entity.isSoldSeparately)
  @IsNotEmpty()
  isOnSale: boolean = false;

  @Prop({ requiredIf: (component: Component) => component.isSoldSeparately })
  @ValidateIf((entity) => entity.isSoldSeparately)
  @IsNotEmpty()
  @Min(0, { message: 'Percentage must be positive' })
  salePercentage: number = 0;

  @Prop({ required: false })
  componentColor: string;

  @Prop({ required: false })
  componentSize: string;

  @Prop({ required: true })
  @IsNotEmpty()
  businessId: string;
}

export const ComponentSchema = SchemaFactory.createForClass(Component);
