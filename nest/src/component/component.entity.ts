import { Length, Min, IsNotEmpty, ValidateIf } from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema()
export class Component extends Document {

    @Prop({ type: SchemaTypes.ObjectId, required: true, auto: true })
    id: Types.ObjectId;

    @Prop({ required: true, unique: true })
    @IsNotEmpty()
    @Length(3, 20, { message: "Name must be between 3 and 20 letters" })
    componentName: string;

    @Prop({ required: true })
    @IsNotEmpty()
    @Min(1, { message: "Price must be more than 1" })
    componentBuyPrice: number;

    @Prop({ required: true })
    addingComponentDate: Date = new Date();

    @Prop({ required: true })
    @IsNotEmpty()
    @Min(1, { message: "Minimum quantity must be positive" })
    minQuantity: number;

    @Prop({ required: true })
    @Min(0, { message: "Stock must be positive" })
    componentStock: number;

    @Prop({ required: true })
    isActive: boolean = false;

    @Prop({ required: true })
    @IsNotEmpty()
    adminId: string;

    @Prop({ required: true })
    isSoldSeparately: boolean = false;

    @Prop({ required: true })
    @ValidateIf((entity) => entity.isSoldSeparately)
    @IsNotEmpty()
    componentDescription: string;

    @Prop({ required: true })
    @ValidateIf((entity) => entity.isSoldSeparately)
    @IsNotEmpty()
    salePrice: number;

    @Prop({ required: true })
    @ValidateIf((entity) => entity.isSoldSeparately)
    @IsNotEmpty()
    componentImages: string[];

    @Prop({ required: true })
    @ValidateIf((entity) => entity.isSoldSeparately)
    @IsNotEmpty()
    isInSale: boolean = false;

    @Prop({ required: true })
    @ValidateIf((entity) => entity.isSoldSeparately)
    @IsNotEmpty()
    @Min(0, { message: "Percentage must be positive" })
    salePercentage: number = 0;

    @Prop()
    componentColor: string;

    @Prop()
    componentSize: string;

    @Prop({ required: true })
    @IsNotEmpty()
    businessId: string;
}

export const ComponentSchema = SchemaFactory.createForClass(Component);