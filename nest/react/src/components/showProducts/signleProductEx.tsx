import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import {ProductCardProps} from './IProduct.interface'
// import CustomSlider from './custom.slider';
//import ImageViewer from './custom.slider'

export default function ProductCard({ product }: ProductCardProps) {
  // const images = [
	// 	{
	// 	  imgURL:
	// 		"https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
	// 	  imgAlt: "img-1"
	// 	},
	// 	{
	// 	  imgURL:
	// 		"https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
	// 	  imgAlt: "img-2"
	// 	},
	// 	{
	// 	  imgURL:
	// 		"https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
	// 	  imgAlt: "img-3"
	// 	},
	// 	{
	// 	  imgURL:
	// 		"https://images.pexels.com/photos/54455/cook-food-kitchen-eat-54455.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
	// 	  imgAlt: "img-4"
	// 	}
	//   ];
	  
  return (
    <Card sx={{ width: 200, maxWidth: '100%', boxShadow: 'lg' ,margin:2}}>
      <CardOverflow>
        <AspectRatio sx={{ minWidth: 200 }}>
        {/* <CustomSlider>
        {images.map((image, index) => {
          return <img key={index} src={image.imgURL} alt={image.imgAlt} />;
        })}
      </CustomSlider> */}
      {/* <ImageViewer/> */}
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        {/* <Typography level="body-xs">Bluetooth Headset</Typography>
        <Link
          href="#product-card"
          fontWeight="md"
          color="neutral"
          textColor="text.primary"
          overlay
          endDecorator={<ArrowOutwardIcon />}
        >
          Super Rockez A400
        </Link> */}

        <Typography
          level="title-lg"
          sx={{ mt: 1, fontWeight: 'xl' }}
          endDecorator={
            <Chip component="span" size="sm" variant="soft" color="success">
              Lowest price
            </Chip>
          }
        >
          2,900 THB
        </Typography>
        <Typography level="body-sm">
          (Only <b>7</b> left in stock!)
        </Typography>
      </CardContent>
      <CardOverflow>
        <Button variant="solid" color="danger" size="lg">
          Add to cart
        </Button>
      </CardOverflow>
      {product.id}
    </Card>
  );
}
