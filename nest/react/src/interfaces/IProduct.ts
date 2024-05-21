interface IProduct{
    name:string;
    description:string;
    images:string[];
    packageCost:number;
    productsComponent:IComponent[];
    totalPrice:number;
    adminId:string;
    isActive:boolean;
    isOnSale:boolean;
    salePrecentage?:number;//nullable
    stock:number;
    buisnessId:string;
}
