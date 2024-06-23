import React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import { IProduct } from '../../interfaces/IProduct'

const ProductCard: React.FC<{ product: IProduct }> = ({ product }) => {
  return (
    <Card sx={{ width: 200, maxWidth: '100%', boxShadow: 'lg', margin: 2 }}>
      <CardOverflow>
        <AspectRatio sx={{ minWidth: 200 }}>
        {product.componentsImages.map((image) => (
          <img></img>
          // <img src={image.src} alt={image.alt} key={image.id} />
        ))}
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="title-lg" sx={{ mt: 1, fontWeight: 'xl' }}>
          {product.productName}
        </Typography>
        <Typography level="body-sm">
          {product.totalPrice}
        </Typography>
      </CardContent>
      <CardOverflow>
        <Button variant="solid" color="danger" size="lg">
          Add to cart
        </Button>
      </CardOverflow>
    </Card>
  );
}
export default ProductCard;