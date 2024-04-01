import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const baseUrl=process.env.BASEURL;
const providerUrl=process.env.PROVIDERURL;

export const getAllProviders=(businessId:number)=>{
    return axios.get(`${baseUrl}/${providerUrl}/${businessId}`);
}

export const deleteProvider=(providerId:number):Promise<void>=>{
    return axios.delete(`${baseUrl}/${providerUrl}/${providerId}`);
}

export const addProvider=(provider:any)=>{
    return axios.post(`${baseUrl}/${providerUrl}`,provider);
}

export const updateProvider=(providerId:number,provider:any)=>{
    return axios.put(`${baseUrl}/${providerUrl}/${providerId}`,provider);
}
