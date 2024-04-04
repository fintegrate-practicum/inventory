
import { Length, Min } from 'class-validator';
import { Column, Double, Entity } from 'typeorm';


@Entity()
export class Component {

    @Column({ nullable: false })
    isSoldSeparately: boolean=false;

    @Column({ nullable: false })
    @Length(3, 15, { message: "must be at least 3 characters" })
    componentStatus: string;

    @Column({ nullable: false })
    @Length(3, 20, { message: "name must be at least 3 characters" })
    componentName: string;

    @Column({ nullable: false })
    @Min(1,{message:"price must be more than 1"})
    componentPrice: Double;

    @Column({ nullable: false })
    componentDescription: string;

    @Column({ nullable: false })
    isInSale: boolean=false;

    @Column({ nullable: false })
    @Min(1,{message:"percentage must be positive"})
    salePercentage: Double;

    @Column({ nullable: false })
    @Min(0,{message:"stoke must be positive"})
    componentStock: number;

    @Column({ nullable: false })
    @Length(3, 15, { message: "must be at least 3 characters" })
    componentCompany: string;

    @Column({ nullable: false })
    @Length(3, 15, { message: "must be at least 3 characters" })
    componentCategory: string;

    @Column({ nullable: false })
    addingComponentBy: number;

    @Column({ nullable: false })
    businessId: number;

    @Column({ nullable: false })
    addingComponentDate: Date;

    @Column({ nullable: false })
    @Min(1,{message:"must be positive"})
    minimalQuantityAlert: number;

    @Column({ nullable: true })
    componentColor: string;

    @Column({ nullable: true })
    componentSize: string;

    @Column({ nullable: true })
    componentImages: string[];

}