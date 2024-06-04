
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector ,useDispatch} from "react-redux";
import { useNavigate } from 'react-router-dom';
import  {IProduct}  from "../interfaces/IProduct";
import { IComponent } from "../interfaces/IComponent";
import {addProduct} from "../features/product/productSlice";

interface IFormInput {
    id:string
    Name: string
    Description: string
    Pictures: FileList
    Price:number
  }

const AddProductForm=()=>{

    const { register, handleSubmit} = useForm<IFormInput>()
    const dispatch=useDispatch();
    const onSubmit: SubmitHandler<IFormInput> = (data)=>{
            dispatch(addProduct(data));
          console.log(data);
          
    }
     
    
    const navigate = useNavigate();
    const productState = useSelector((state: any) => state.product);
    const productComponents = productState.data.map((product: IProduct) => product.productComponents);
    
    const sumArrComponent=()=>{
      let sum=0;
      productComponents.forEach((component:IComponent)=>{
          sum+=component.componentBuyPrice
      })
      return sum;
    }
  //   const save = (data: IFormInput) => {
  //     console.log(data); 
  // }


    return (
      // <form onSubmit={handleSubmit(save)}>

        <form onSubmit={handleSubmit(onSubmit)}>
        <label >Name of Product</label><br />
        <input {...register("Name", { required: true, maxLength: 20 })} />
        <br />
        <label >Description of Product</label><br />
        <input {...register("Description", { required: true })} />
        <br />
        <input type="file"   accept="image/*" {...register("Pictures", { required: true })} />
        <br />
        <button onClick={()=>navigate('/')}>select components</button>
        <div>{sumArrComponent()}</div>
        <br />
        <label>Price</label><br />
        <input type="number" {...register("Price", { required: true,min: 0.01 })} />
        <br />
        <input type="submit" />
      </form>
    );
}
export default AddProductForm