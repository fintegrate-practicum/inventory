import React from 'react';
import SingalComponent from './SingalComponent';
import {Product} from '../../App';

 const SingalProduct: React.FunctionComponent<{product: Product;}>  = ({ product }) => {
    return (
        <> 
        <h2>name: {product.productName}</h2>
        <h2>price: {product.totalPrice}</h2>
        <h2>count: {product.stockQuantity}</h2>


        components:
        {product.productComponents.map((item, index) => (
                    <p key={index}>
                        <SingalComponent component={item} />
                    </p>))
        }
        </>
    );
}

export default SingalProduct;
