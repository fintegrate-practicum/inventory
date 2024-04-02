import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const baseUrl=process.env.BASE_URL;

export const deleteComponent=(componentId:number):Promise<void>=>{
    return axios.delete(`${baseUrl}/component/${componentId}`);
}

export const addComponent=(component:any)=>{
    return axios.post(`${baseUrl}/component`,component);
}


export const updateComponent=(componentId:number,component:any)=>{
    return axios.put(`${baseUrl}/component/${componentId}`,component);
}

export const updateQuantityComponent=(componentId:number,count:number)=>{
    return axios.put(`${baseUrl}/component/${componentId}`,count);
}