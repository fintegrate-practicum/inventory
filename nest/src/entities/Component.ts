import { Length, Min, IsNotEmpty, ValidateIf } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()

export class Component {

    @PrimaryGeneratedColumn()
    id: string;

    @Column({ nullable: false })
    @IsNotEmpty()
    @Length(3, 20, { message: "name must be between 3 and 20 letters" })
    componentName: string;

    @Column({ nullable: false })
    @IsNotEmpty()
    @Min(1, { message: "price must be more than 1" })
    componentBuyPrice: number;

    @Column({ nullable: false })
    @IsNotEmpty()
    businessId: number;

    @Column({ nullable: false })
    @IsNotEmpty()
    addingComponentDate: Date = new Date();

    @Column({ nullable: false })
    @IsNotEmpty()
    @Min(1, { message: "min quantity must be positive" })
    minQuantity: number;

    @Column({ nullable: false })
    @IsNotEmpty()
    @Min(0, { message: "stoke must be positive" })
    componentStock: number = 0;

    @Column({ nullable: false })
    @IsNotEmpty()
    isActive: boolean = false;

    @Column({ nullable: false })
    @IsNotEmpty()
    adminId: string;

    @Column({ nullable: false })
    @IsNotEmpty()
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
    @IsNotEmpty()
    @Length(3, 15, { message: "status must be between 3 and 15 letters" })
    componentStatus: string;

    @Column({ nullable: false })
    @IsNotEmpty()
    bussinesId: string;

}