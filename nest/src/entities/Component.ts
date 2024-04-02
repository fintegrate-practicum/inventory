
import { Column, Double, Entity } from 'typeorm';


@Entity()
export class Component {

    @Column({ nullable: false })
    isSoldSeparately: boolean;

    @Column({ nullable: false })
    componentStatus: string;

    @Column({ nullable: false })
    componentName: string;

    @Column({ nullable: false })
    componentPrice: Double;

    @Column({ nullable: false })
    componentDescription: string;

    @Column({ nullable: false })
    isInSale: boolean;

    @Column({ nullable: false })
    salePercentage: Double;

    @Column({ nullable: false })
    componentStock: number;

    @Column({ nullable: false })
    componentCompany: string;

    @Column({ nullable: false })
    componentCategory: string;

    @Column({ nullable: false })
    addingComponentBy: number;

    @Column({ nullable: false })
    businessId: number;

    @Column({ nullable: false })
    addingComponentDate: Date;

    @Column({ nullable: false })
    minimalQuantityAlert: number;

    @Column({ nullable: true })
    componentColor: string;

    @Column({ nullable: true })
    componentSize: string;

    @Column({ nullable: true })
    componentImages: string[];

}