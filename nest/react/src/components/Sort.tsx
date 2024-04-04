
import { useState } from 'react';
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

const Sort:React.FunctionComponent<{arrInventory:Product[]}>=({arrInventory})=>{
   const [sortedArr, setSortedArr] = useState<Product[]>([...arrInventory]);

    function sortByName() {
        const tempSort = [...arrInventory].sort((a, b) => a.name.localeCompare(b.name));
        setSortedArr(tempSort);
    }
    
    const sortByMaxPrice = () => {
        const tempSort = [...arrInventory].sort((a, b) => a.price - b.price);
        setSortedArr(tempSort);
    }

    const sortByMinPrice = () => {
        const tempSort = [...arrInventory].sort((a, b) => b.price - a.price);
        setSortedArr(tempSort);
    }

   const sortByCountInventory = () => {
        const tempSort = [...arrInventory].sort((a, b) => a.count - b.count);
        setSortedArr(tempSort);
    }
    return(
        <>
        <div className="sortBy">
        <input type='button'  value="byName" onClick={sortByName} />
        <input type='button'  value="byMaxPrice" onClick={sortByMaxPrice} />
        <input type='button'  value="byMinPrice" onClick={sortByMinPrice} />
        <input type='button'  value="byCountInventory" onClick={sortByCountInventory} />
        </div>
        </>
    );
}
    export default Sort;