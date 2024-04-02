import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const baseUrl=process.env.BASE_URL;

export const getAllProductsAdmin=(adminId:number)=>{
    return axios.get(`${baseUrl}/product/${adminId}`);
}

export const deleteProduct=(productId:number):Promise<void>=>{
    return axios.delete(`${baseUrl}/product/${productId}`);
}

export const addProduct=(product:any)=>{
    return axios.post(`${baseUrl}/product`,product);
}

export const updateProduct=(productId:number,product:any)=>{
    return axios.put(`${baseUrl}/product/${productId}`,product);
}

export const updateProductsPrice=(adminId:number,percent:number):Promise<void>=>{
    return axios.put(`${baseUrl}/product/${adminId}`,percent);
}

export const getAllProductsCustomer=(businessId:number)=>{
    return axios.get(`${baseUrl}/product/${businessId}`);
}

export const getAllProductById=(productId:number)=>{
    return axios.get(`${baseUrl}/product/${productId}`);
}