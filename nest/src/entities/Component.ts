import { Length, Min, IsNotEmpty, ValidateIf } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity()

export class Component {

    @Column({ nullable: false })
    @Length(3, 20, { message: "name must be at least 3 characters" })
    componentName: string;

    @Column({ nullable: false })
    @Min(1, { message: "price must be more than 1" })
    componentBuyPrice: number;

    @Column({ nullable: false })
    businessId: number;

    @Column({ nullable: false })
    addingComponentDate: Date = new Date();

    @Column({ nullable: false })
    @Min(1, { message: "must be positive" })
    minQuantity: number;

    @Column({ nullable: false })
    @Min(0, { message: "stoke must be positive" })
    componentStock: number = 0;

    @Column({ nullable: false })
    isActive: boolean = false;

    @Column({ nullable: false })
    adminId: string;

    @Column({ nullable: false })
    isSoldSeparately: boolean = false;

    @Column({ nullable: false })
    @ValidateIf((entity) => entity.isSoldSeparately)
    @IsNotEmpty()
    componentDescription: string;

    @Column({ nullable: false })
    @ValidateIf((entity) => entity.isSoldSeparately)
    @IsNotEmpty()
    salePrice: number;

    @Column({ nullable: true })
    @ValidateIf((entity) => entity.isSoldSeparately)
    @IsNotEmpty()
    componentImages: string[];

    @Column({ nullable: false })
    @ValidateIf((entity) => entity.isSoldSeparately)
    @IsNotEmpty()
    isInSale: boolean = false;

    @Column({ nullable: false })
    @ValidateIf((entity) => entity.isSoldSeparately)
    @IsNotEmpty()
    @Min(1, { message: "percentage must be positive" })
    salePercentage: number;

    @Column({ nullable: true })
    componentColor: string;

    @Column({ nullable: true })
    componentSize: string;

    @Column({ nullable: false })
    @Length(3, 15, { message: "must be at least 3 characters" })
    componentStatus: string;

    @Column({ nullable: false })
    bussinesId: string;

}