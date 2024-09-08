import { Length, Min, IsNotEmpty, ValidateIf } from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { VariantSchema, Variant } from '../entities/variant.entity';
import { CustomFieldSchema, CustomField } from '../entities/customField.entity';

@Schema()
export class Product extends Document {
  @Prop({ required: true, unique: true })
  @IsNotEmpty()
  @Length(3, 20, { message: 'Product name must be between 3 and 20 letters' })
  name: string;

  @Prop({ required: true })
  @IsNotEmpty()
  description: string;

  @Prop({ required: true })
  @IsNotEmpty()
  images: string[];

  @Prop({ required: true })
  @IsNotEmpty()
  @Min(0, { message: 'Package cost must be more than 1' })
  packageCost: number;

  @Prop({ required: true })
  @IsNotEmpty()
  productComponents: string[];

  @Prop({ required: true })
  @IsNotEmpty()
  @Min(1, { message: 'Price must be positive' })
  totalPrice: number;

  @Prop({ required: true })
  @IsNotEmpty()
  adminId: string;

  @Prop({ default: true })
  isActive: boolean = true;

  @Prop({ required: false })
  isOnSale: boolean = false;

  @Prop({ requiredIf: (product: Product) => product.isOnSale })
  @ValidateIf((entity) => entity.isOnSale)
  @IsNotEmpty()
  @Min(0, { message: 'Percentage must be positive' })
  salePercentage: number = 0;

  @Prop({ required: false })
  @IsNotEmpty()
  @Min(0, { message: 'Stock quantity must be positive' })
  stockQuantity: number;

  @Prop({ required: true })
  @IsNotEmpty()
  businessId: string;

  @Prop({ required: true })
  @IsNotEmpty()
  @Length(3, 15, { message: 'Status must be between 3 and 15 letters' })
  componentStatus: string;

  @Prop({ type: [CustomFieldSchema], default: [] })
  customFields: CustomField[];

  @Prop({ type: [VariantSchema], required: false })
  variants: Variant[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.virtual('id').get(function (this: Document & { _id: Types.ObjectId }) {
  return this._id.toHexString();
});

ProductSchema.set('toJSON', {
  virtuals: true,
});

ProductSchema.set('toObject', {
  virtuals: true,
});
