import * as React from 'react';
import Grid from '@mui/joy/Grid';
import ProductCard from './signleProductEx';
import ProductData from './listProducts';

export default function SpacingGrid() {
  const [spacing, setSpacing] = React.useState(2);
  const products = ProductData();

  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        <Grid container justifyContent="center" spacing={spacing}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
    </Grid>
  );
}
