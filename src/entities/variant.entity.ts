import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema()
export class Variant extends Document {
  @Prop({ required: false, type: SchemaTypes.Mixed })
  customFields: Record<string, any>;

  @Prop({ required: false })
  stockQuantity: number;

  @Prop({ required: false })
  additionalPrice: number;
}

export const VariantSchema = SchemaFactory.createForClass(Variant);
