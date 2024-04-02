import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const baseUrl=process.env.BASE_URL;

export const getAllProviders=(businessId:number)=>{
    return axios.get(`${baseUrl}/providers/${businessId}`);
}

export const deleteProvider=(providerId:number):Promise<void>=>{
    return axios.delete(`${baseUrl}/providers/${providerId}`);
}

export const addProvider=(provider:any)=>{
    return axios.post(`${baseUrl}/providers`,provider);
}

export const updateProvider=(providerId:number,provider:any)=>{
    return axios.put(`${baseUrl}/providers/${providerId}`,provider);
}
