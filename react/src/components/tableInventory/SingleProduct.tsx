import React from 'react';
import { IProduct } from '../../interfaces/IProduct';

 const SingleProduct: React.FunctionComponent<{product: IProduct;}>  = ({ product }) => {
    return (
        <> 
        <h2>name: {product.productName}</h2>
        <h2>price: {product.totalPrice}</h2>
        <h2>Qty: {product.stockQuantity}</h2>


        components:
        {/* {product.productComponents.map((item, index) => (
                    <p key={index}>
                        <SingleComponent component={item} />
                    </p>))
        } */}
        </>
    );
}

export default SingleProduct;
