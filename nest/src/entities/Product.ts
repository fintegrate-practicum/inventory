import { Column, Double, Entity } from "typeorm";
import { Component } from './Component';

@Entity()

export class Product {

    @Column({ nullable: false })
    productComponents: Component[];

    @Column({ nullable: false })
    totalPrice: Double;

    @Column({ nullable: false })
    adminIn: number

}