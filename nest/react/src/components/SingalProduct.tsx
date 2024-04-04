import React from 'react';
import SingalCmponent from './SingalComponent';

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

// interface Component {
//     //בשביל התחלה....
//     name: string;
//     price: number;

//   }
interface SingalProductProps {
    product: Product;
  }
 const SingalProduct: React.FunctionComponent<SingalProductProps>  = ({ product }) => {
    return (
        <> 
        <h2>name: {product.name}</h2>
        <h2>price: {product.price}</h2>
        <h2>count: {product.count}</h2>


        components:
        {product.component.map((item, index) => (
                    <p key={index}>
                        <SingalCmponent componentOne={item} />
                    </p>))
        }
        </>
    );
}

export default SingalProduct;
