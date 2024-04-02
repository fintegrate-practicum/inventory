import { Column, Entity } from "typeorm";

@Entity()

export class Provider {

    @Column({ nullable: false })
    providerName: string;

    @Column({ nullable: false })
    providerEmail: string;

    @Column({ nullable: false })
    providerPhone: string;

    @Column({ nullable: true })
    webSiteUrl: string;

    @Column({ nullable: false })
    supplyCategory: string;

    @Column({ nullable: false })
    businessId: string;

}

