import axios from 'axios';
import {baseUrl} from '../config';

//administrator permissions
export const getAllProviders=(businessId:number)=>{
    return axios.get(`${baseUrl}/api/providers/${businessId}`);
}

export const deleteProvider=(providerId:number):Promise<void>=>{
    return axios.delete(`${baseUrl}/api/providers/${providerId}`);
}

export const addProvider=(provider:any)=>{
    return axios.post(`${baseUrl}/api/providers`,provider);
}

export const updateProvider=(providerId:number,provider:any)=>{
    return axios.put(`${baseUrl}/api/providers/${providerId}`,provider);
}
