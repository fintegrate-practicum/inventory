import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class CustomField extends Document {
  @Prop({ required: true })
  fieldName: string;

  @Prop({ required: true })
  fieldType: string;

  @Prop({ type: [Object], default: [] })
  options: { value: string; label: string }[];

  @Prop({ default: false })
  isRequired: boolean;
}

export const CustomFieldSchema = SchemaFactory.createForClass(CustomField);
