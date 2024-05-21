import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector ,useDispatch} from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Product, addProduct } from "../features/product/productSlice";
import { RootState } from "@reduxjs/toolkit/query";
import { Component } from "../features/component/componentSlice";


interface IFormInput {
    Name: string
    Description: string
    Pictures: FileList
    Price:number
  }

const AddProductForm=()=>{
    const { register, handleSubmit} = useForm<IFormInput>()
    const dispatch=useDispatch();
    const onSubmit: SubmitHandler<IFormInput> = (data) =>console.log(data);
    const navigate = useNavigate();
    const productState = useSelector((state: any) => state.product);
    const productComponents = productState.data.map((product: Product) => product.productComponents);
    
    const sumArrComponent=()=>{
      let sum=0;
      productComponents.forEach((component:Component)=>{
          sum+=component.price
      })
      return sum;
    }

    return (
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