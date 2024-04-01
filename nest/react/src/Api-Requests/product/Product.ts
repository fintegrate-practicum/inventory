import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const baseUrl=process.env.BASEURL;
const productUrl=process.env.PRODUCTURL;

export const getAllProductsAdmin=(adminId:number)=>{
    return axios.get(`${baseUrl}/${productUrl}/${adminId}`);
}

export const deleteProduct=(productId:number):Promise<void>=>{
    return axios.delete(`${baseUrl}/${productUrl}/${productId}`);
}

export const addProduct=(product:any)=>{
    return axios.post(`${baseUrl}/${productUrl}`,product);
}

export const updateProduct=(productId:number,product:any)=>{
    return axios.put(`${baseUrl}/${productUrl}/${productId}`,product);
}

export const updateProductsPrice=(adminId:number,percent:number):Promise<void>=>{
    return axios.put(`${baseUrl}/${productUrl}/${adminId}`,percent);
}

export const getAllProductsCustomer=(businessId:number,page:number,searchText:string,category:string)=>{
    return axios.get(`${baseUrl}/${productUrl}/${businessId}/?page=${page}&searchText=${searchText}&category=${category}`);
}
