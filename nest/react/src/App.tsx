import { useState } from 'react';
import './App.css';
import AllProducts from './components/tableInventory/AllProducts';


 export interface Component {
  //בשביל התחלה....
  name: string;
  price: number;

}
export interface Product {
  id: string;
  productName: string;
  productDescription: string;
  componentsImages: string[];
  productComponents: Component[];
  packageCost: number;
  totalPrice: number;
  adminId: string;
  isActive: boolean;
  isOnSale: boolean;
  salePercentage: number;
  stockQuantity: number;
  bussinesId: string;
  componentStatus: string;
}
function App() {
  const [arrInventory, setArrInventory] = useState<Product[]>([
    {id: "1",
      productName: "table",
      productDescription:"mnbvcx",
      componentsImages: [],
      productComponents: [{ name: "table leg", price: 10 }, { name: "table leg", price: 10 }],
      packageCost: 100,
      totalPrice: 300,
      adminId: "12",
      isActive: true,
      isOnSale: true,
      salePercentage: 10,
      stockQuantity: 40,
      bussinesId: "44",
      componentStatus: ""},
      {id: "2",
      productName: "table",
      productDescription:"aaaaaaaaaaaa",
      componentsImages: [],
      productComponents: [{ name: "table leg", price: 10 }, { name: "table leg", price: 10 }],
      packageCost: 100,
      totalPrice: 200,
      adminId: "12",
      isActive: true,
      isOnSale: true,
      salePercentage: 10,
      stockQuantity: 50,
      bussinesId: "44",
      componentStatus: ""},
  ])

  return (
    <>
      <AllProducts arrInventory={arrInventory} />
    </>
  )
}
export default App

