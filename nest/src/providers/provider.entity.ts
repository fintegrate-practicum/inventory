import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, Length } from 'class-validator';
import { Document } from 'mongoose';

@Schema()
export class Provider extends Document {
    @Prop({ required: true, unique: true })
    @Length(2, 15, { message: 'must be between 2 and 15 letters' })
    providerName: string;

    @Prop({ required: true, unique: true })
    @IsEmail({}, { message: 'please provide a valid email address' })
    providerEmail: string;

    @Prop({ required: true })
    @Length(7, 10, { message: 'phone number is between 7 and 10 digits' })
    providerPhone: string;

    @Prop()
    webSiteUrl: string;

    @Prop({ required: true })
    supplyCategory: string;

    @Prop({ required: true })
    businessId: string;

    @Prop({ required: true, default: true })
    isActive: boolean;
}

export const ProviderSchema = SchemaFactory.createForClass(Provider);
