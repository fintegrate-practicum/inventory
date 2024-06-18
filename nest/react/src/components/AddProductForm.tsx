import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector ,useDispatch} from "react-redux";
import { useNavigate } from 'react-router-dom';
import  {IProduct}  from "../interfaces/IProduct";
import { IComponent } from "../interfaces/IComponent";
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import  Button  from '@mui/material/Button';
import Box from '@mui/material/Box';
interface IFormInput {
    Name: string;
    Description: string;
    Pictures: FileList | null;
    Price:number;

  }
const AddProductForm=()=>{

  const productSchema = yup.object().shape({
   Name: yup.string().required("Name is a required field").min(3, "Name must be at least 3 characters").max(20, "Name must be at most 20 characters"),
   Description: yup.string().required("Description is a required field"),
   Price: yup.string().required("price is a required field").matches(/^[0-9]{1,}$/, "price consists of numbers only"),
   Pictures: yup.array().min(1, "must be at least 1").max(5, "must be at most 5").required('please select an image')
});

  const { register, handleSubmit, setValue, formState: { errors } } =
  useForm<IProduct>({ resolver:  yupResolver(productSchema) });
    const dispatch=useDispatch();
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
      if (!selectedImages || selectedImages.length < 1 || selectedImages.length > 4) {
        console.error('Please select between 1 and 4 images.');
        return;
      }
      if (selectedImages) {
          try {
              const formData = new FormData();
              formData.append('Name', data.Name);
              formData.append('Description', data.Description);
              formData.append('Price', data.Price.toString());
              Array.from(selectedImages).forEach((image) => {
                  formData.append('Pictures', image);
              });
          } catch (error) {
              console.error('שגיאה בהוספת מוצר:', error);
              // טפל במקרה של שגיאה
          }
      } else {
          console.error("No images selected!");
      }
  };
    const navigate = useNavigate();
    const productState = useSelector((state: any) => state.product);
    const productComponents = productState.data.map((product: IProduct) => product.productComponents);
    const [selectedImages, setSelectedImages] = useState<FileList | null>(null);
    const sumArrComponent=()=>{
      let sum=0;
      productComponents.forEach((component:IComponent)=>{
          sum+=component.componentBuyPrice
      })
      return sum;
    }
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const files = event.target.files;
        if (files.length > 4) {
          console.error('Maximum of 4 images allowed.');
          return;
        }
        setSelectedImages(files);
      }
  };
    return (
         <form onSubmit={handleSubmit(onSubmit)}>
             {!errors.Name?
                <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' }, }} noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="name" variant="outlined" {...register("Name")} />
                </Box>
                :
                <Box className='itemInput' sx={{ '& .MuiTextField-root': { m: 1, width: '18ch' }, }} noValidate autoComplete="off">
                    <TextField
                        error
                        id="outlined-error-helper-text"
                        label="name"
                        defaultValue="name"
                        helperText={errors.Name.message}
                        {...register("Name")}
                    />
                </Box>
            }

           {!errors.Description ?
                <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' }, }} noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="description" variant="outlined" {...register("Description")} />
                </Box>
                :
                <Box className='itemInput' sx={{ '& .MuiTextField-root': { m: 1, width: '18ch' }, }} noValidate autoComplete="off">
                    <TextField
                        error
                        id="outlined-error-helper-text"
                        label="description"
                        defaultValue="Description"
                        helperText={errors.Description.message}
                        {...register("Description")}
                    />
                </Box>
            }
            <Button variant="contained" color="success" onClick={()=>navigate('/')}>select components</Button>
            <div>{sumArrComponent()}</div>
            <input type="file" accept="image/*" multiple {...register('Pictures',{min:1,max:4})} onChange={handleImageChange}/>
            {!errors.Price ?
                <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' }, }} noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="price" variant="outlined" {...register("Price")} />
                </Box>
                :
                <Box className='itemInput' sx={{ '& .MuiTextField-root': { m: 1, width: '18ch' }, }} noValidate autoComplete="off">
                    <TextField
                        error
                        id="outlined-error-helper-text"
                        label="price"
                        defaultValue="price"
                        helperText={errors.Price.message}
                        {...register("Price")}
                    />
                </Box>
            }
            <Button variant="contained" color="success" type="submit" >Submit</Button>
        </form>
  );
}
export default AddProductForm;



