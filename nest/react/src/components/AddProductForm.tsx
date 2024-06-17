import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector ,useDispatch} from "react-redux";
import { useNavigate } from 'react-router-dom';
import  {IProduct}  from "../interfaces/IProduct";
import { IComponent } from "../interfaces/IComponent";
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
interface IFormInput {
    Name: string;
    Description: string;
    Pictures: FileList | null;
    Price:number;
  }
const AddProductForm=()=>{
  const notSaleAloneSchema = yup.object().shape({
    name: yup.string().required("name is a required field").min(3, "name must be at least 3 characters").max(20, "name must be at most 20 characters"),
    purchasePrice: yup.number().required("purchase price is a required field").positive("price must be positive"),
    isAlone: yup.boolean()
});
  const { register, handleSubmit, setValue, formState: { errors } } =
  useForm<IProduct>({ resolver:  yupResolver(notSaleAloneSchema) });
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
       <div> <TextField id="outlined-basic" label="Name of Product" variant="outlined"  {...register("Name", { required: true, maxLength: 20 })} /></div>
        <div><TextField id="outlined-basic" label="Description of Product" variant="outlined"  {...register("Description", { required: true })} /></div>
        <br />
        <button onClick={()=>navigate('/')}>select components</button>
        <div>{sumArrComponent()}</div>
        <br />
        <input type="file" accept="image/*" multiple {...register('Pictures',{min:1,max:4})} onChange={handleImageChange}/>
        <br />
        <label>Price</label><br />
        <input type="number" {...register("Price", { required: true,min: 0.01 })} />
        <br />
        <input type="submit" />
      </form>
    );
}
export default AddProductForm;