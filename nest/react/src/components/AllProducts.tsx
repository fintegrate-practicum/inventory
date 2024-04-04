import React, { useState } from 'react';
import SingalProduct from './SingalProduct';
import Sort from './Sort';
//import { useDispatch, useSelector } from 'react-redux';

const AllProducts: React.FunctionComponent<{arrInventory:any[]}>=({arrInventory})=>{
 //   const arrInventory = useSelector((state:any[])=>state.product.productsArr)
    //const dispatch = useDispatch();
    const [search, setSearch] = useState<string>("");
    let filtered = arrInventory.filter((item) => item.name.includes(search));


    return (
        <>
        <input type="text" placeholder={"search"} onChange={(e) => { setSearch(e.target.value) }} />
        <Sort arrInventory={arrInventory}/>
            <ul>
                {search === "" ?
                    arrInventory.map((item, index) => (
                        <li key={index}>
                            <SingalProduct product={item} />
                        </li>
                    )) :
                    filtered.map((item, index) => (
                        <li key={index}>
                            <SingalProduct product={item} />
                        </li>
                    ))
                }
            </ul>
        </>
    );
}

export default AllProducts;
