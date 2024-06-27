import React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import { IProduct } from '../../interfaces/IProduct'
import { IComponent } from '../../interfaces/IComponent';

const SingleProduct: React.FC<{ product: IProduct | IComponent }> = ({ product }) => {

  return (
    <Card sx={{ width: 200, maxWidth: '100%', boxShadow: 'lg', margin: 2 }}>
      <CardOverflow>
        {/* <AspectRatio sx={{ minWidth: 200 }}>
          {"totalPrice" in product ? (
            product.componentsImages.map((image) => (
              <img></img>
              // <img src={image.src} alt={image.alt} key={image.id} />
            ))
          ) : (
            product.componentImages.map((image) => (
              <img></img>
            ))
          )};
        </AspectRatio> */}
      </CardOverflow>
      <CardContent>
        <Typography level="title-lg" sx={{ mt: 1, fontWeight: 'xl' }}>
          {/* {"totalPrice" in product ? (
            product.productName
          ) : (
            product.componentName
          )} */}
          {}
        </Typography>
        {/* <Typography level="title-lg" sx={{ mt: 1, fontSize: 14 }}>
          {"totalPrice" in product ? (
            product.productDescription
          ) : (
            product.componentDescription
          )
          }
        </Typography>
        <Typography level="body-sm">
          {"totalPrice" in product ? (
            product.totalPrice
          ) : (
            product.salePrice
          )
          }
        </Typography> */}
      </CardContent>
      <CardOverflow>
        <Button variant="solid" color="danger" size="lg">
          Add to cart
        </Button>
      </CardOverflow>
    </Card>
  );
}
export default SingleProduct;