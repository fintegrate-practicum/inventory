import axios from 'axios';
import {baseUrl} from '../config';

//administrator permissions
export const getAllProductsAdmin=(adminId:number)=>{
    return axios.get(`${baseUrl}/api/inventory/${adminId}`);
}

export const deleteProduct=(productId:number):Promise<void>=>{
    return axios.delete(`${baseUrl}/api/inventory/${productId}`);
}

export const addProduct=(product:any)=>{
    return axios.post(`${baseUrl}/api/inventory`,product);
}

export const updateProduct=(productId:number,product:any)=>{
    return axios.put(`${baseUrl}/api/inventory/${productId}`,product);
}

export const updateProductsPrice=(adminId:number,percent:number):Promise<void>=>{
    return axios.put(`${baseUrl}/api/inventory/${adminId}`,percent);
}

//client permissions

export const getAllProductsCustomer=(businessId:number,page:number,searchText:string,category:string)=>{
    return axios.get(`${baseUrl}/api/inventory/${businessId}/?page=${page}&searchText=${searchText}&category=${category}`);
}
