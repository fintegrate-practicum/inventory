import { useState, useEffect } from 'react';
import Grid from '@mui/joy/Grid';
import ProductCard from './singleProduct';
import { IProduct } from '../../interfaces/IProduct';
import { getAllItems } from '../../Api-Requests/genericRequests';
import { useDispatch } from 'react-redux';
import { getProducts } from '../../features/product/productSlice';

export default function ShowProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const dispatch = useDispatch();

  const getAllProducts = async () => {
    try {
      const res = await getAllItems<IProduct>('product');
      setProducts((prevProducts) => [...prevProducts, { ...res.data }]);
      dispatch(getProducts(products));
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);


  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid container justifyContent="center">
        {products.map((product: IProduct) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
    </Grid>
  );
}
