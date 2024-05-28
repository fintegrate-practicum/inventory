export interface IProduct{
    id: string;
    productName: string;
    productDescription: string;
    componentsImages: string[];
    packageCost: number;
    productComponents: any[];
    totalPrice: number;
    adminId: string;
    isActive: boolean;
    isOnSale: boolean;
    salePercentage: number;
    stockQuantity: number;
    bussinesId: string;
    componentStatus: string;
}