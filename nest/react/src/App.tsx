
import { useState } from 'react'
import './App.css'
import AllProducts from './components/AllProducts';

function App() {
   interface Component {
    //בשביל התחלה....
    name: string;
    price: number;

  }
  
interface Product {
  //בשביל התחלה....
 name:string,
 price:number,
 count:number,
 component:Component[]

}
 const  [arrInventory,setArrInventory]=useState<Product[]>([
  {name:"table",price:180,count:40,component:[{name:"table leg",price:10},{name:"table leg",price:10}]},
  {name:"chair",price:140,count:30,component:[{name:"table leg",price:10},{name:"table leg",price:10}]},
  {name:"desk",price:150,count:20,component:[{name:"table leg",price:10},{name:"table leg",price:10}]},
 ])

  return (
    <>
      <AllProducts arrInventory={arrInventory}/>
    </>
  )
}

export default App
