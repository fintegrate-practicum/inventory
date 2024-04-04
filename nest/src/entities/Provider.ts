import { IsEmail, Length } from "class-validator";
import { Column, Entity } from "typeorm";

@Entity()

export class Provider {

    @Column({ nullable: false })
    @Length(2, 15, { message: "must be at least 3 characters" })
    providerName: string;

    @Column({ nullable: false })
    @IsEmail({}, { message: "please provide a valid email address" })
    providerEmail: string;

    @Column({ nullable: false })
    @Length(7,10,{message:"phone number is between 7 and 10 digits"})
    providerPhone: string;

    @Column({ nullable: true })
    webSiteUrl: string;

    @Column({ nullable: false })
    supplyCategory: string;

    @Column({ nullable: false })
    businessId: string;

}

