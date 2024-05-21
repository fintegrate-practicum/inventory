interface IComponent {
    name: string;
    description: string;
    size: string;
    color: string;
    images?: string[];//nullable 
    dateAddad: Date;
    minQuantity: number;
    buisnessId: string;
    buyPrice: number;
    sellPrice?: number;//nullable 
    isSoldSepartely: boolean;
    stock: number;
    isActive: boolean;
    adminId: string;
    isInSale: boolean;
    salePrecentage?: number;//nullable 
}