
import { useState } from 'react'
import './App.css'
import AllProducts from './components/tableInventory/AllProducts';

function App() {
  interface Component {
    //בשביל התחלה....
    name: string;
    price: number;

  }

  interface Product {
    //בשביל התחלה....
    id: number,
    name: string,
    price: number,
    count: number,
    component: Component[]

  }
  const [arrInventory, setArrInventory] = useState<Product[]>([
    { id: 1, name: "table", price: 180, count: 40, component: [{ name: "table leg", price: 10 }, { name: "table leg", price: 10 }] },
    { id: 2, name: "chair", price: 140, count: 30, component: [{ name: "table leg", price: 10 }, { name: "table leg", price: 10 }] },
    { id: 3, name: "desk", price: 150, count: 20, component: [] },
  ])

  return (
    <>
      <AllProducts arrInventory={arrInventory} />
    </>
  )
}

export default App
