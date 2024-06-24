export interface ProductCardProps {
    product: {
      id: number;
      title: string;
      link: string;
      image: string;
      price: number;
      currency: string;
      stock: number;
    };
  }