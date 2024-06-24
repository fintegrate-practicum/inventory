import { useState, useEffect } from 'react';
import Grid from '@mui/joy/Grid';
import SingleProduct from './singleProduct';
import { IProduct } from '../../interfaces/IProduct';
import { getAllItems } from '../../Api-Requests/genericRequests';
import { useDispatch } from 'react-redux';
import { getProducts } from '../../features/product/productSlice';
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

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

  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 10;

  const paginatedProducts = products.slice(startIndex, startIndex + itemsPerPage);
  const hasNextPage = startIndex + itemsPerPage < products.length;
  const hasPreviousPage = startIndex - itemsPerPage >= 0;

  const showMoreProductsData = () => {
    setStartIndex(startIndex + itemsPerPage);
  };
  const showLessProductsData = () => {
    setStartIndex(Math.max(0, startIndex - itemsPerPage));
  };



  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2} direction="column">
      <Grid container justifyContent="center">
        {paginatedProducts.map((product: IProduct) => (
          <SingleProduct key={product.id} product={product} />
        ))}
      </Grid>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          onClick={showLessProductsData}
          disabled={!hasPreviousPage}
        >
          <ArrowBackIosIcon />
        </Button>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          onClick={showMoreProductsData}
          disabled={!hasNextPage}
        >
          <ArrowForwardIosIcon />
        </Button>
      </div>
    </Grid>
  );
}
