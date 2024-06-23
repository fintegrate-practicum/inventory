import { useState, useEffect } from 'react';
import Grid from '@mui/joy/Grid';
import ProductCard from './signleProduct';
import { IProduct } from '../../interfaces/IProduct';
import { getAllItems } from '../../Api-Requests/genericRequests';

export default function SpacingGrid() {
  const [spacing, setSpacing] = useState(2);
  const [products, setProducts] = useState<IProduct[]>([]);

  const getProducts = async () => {
    try {
      const res = await getAllItems<IProduct>('product');

      //setProducts([res.data]);
      setProducts((prevProducts) => [...prevProducts, {...res.data}]);
      console.log(res.data);
    }
    catch (err) {
      alert(err);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid container justifyContent="center" spacing={spacing}>
        {products.map((product: IProduct) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
    </Grid>
  );
}
