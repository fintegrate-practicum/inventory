import { Min ,Length} from "class-validator";
import { Column, Entity } from "typeorm";

@Entity()

export class Product {

    @Column({ nullable: false })
    productName: string;

    @Column({ nullable: false })
    productDescription: string;

    @Column({ nullable: false })
    componentsImages: string[];

    @Column({ nullable: false })
    @Min(0, { message: "package cost must be positive" })
    packageCost: number;

    @Column({ nullable: false })
    productComponents: any[];

    @Column({ nullable: false })
    @Min(1, { message: "price must be positive" })
    totalPrice: number;

    @Column({ nullable: false })
    adminId: string;

    @Column({ nullable: false })
    isActive: boolean = true;

    @Column({ nullable: true })
    isOnSale: boolean = false;

    @Column({ nullable: true })
    @Min(1, { message: "percentage must be positive" })
    salePercentage: number = 0;

    @Column({ nullable: false })
    @Min(0, { message: "stoke must be positive" })
    stockQuantity: number;

    @Column({ nullable: false })
    bussinesId: string;

    @Column({ nullable: false })
    @Length(3, 15, { message: "must be at least 3 characters" })
    componentStatus: string;

}