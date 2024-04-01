import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const baseUrl=process.env.BASEURL;
const componentUrl=process.env.COMPONENTURL; 

export const deleteComponent=(componentId:number):Promise<void>=>{
    return axios.delete(`${baseUrl}/${componentUrl}/${componentId}`);
}

export const addComponent=(component:any)=>{
    return axios.post(`${baseUrl}/${componentUrl}`,component);
}


export const updateComponent=(componentId:number,component:any)=>{
    return axios.put(`${baseUrl}/${componentUrl}/${componentId}`,component);
}

export const updateQuantityComponent=(componentId:number,count:number)=>{
    return axios.put(`${baseUrl}/${componentUrl}/${componentId}`,count);
}