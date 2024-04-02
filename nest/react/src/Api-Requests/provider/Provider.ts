import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const config = {
    baseURL: process.env.BASE_URL
}

export const getAllProviders = (businessId: number): Promise<any> => {
    return axios.get(`/providers/${businessId}`, config);
}

export const deleteProvider = (providerId: number): Promise<any> => {
    return axios.delete(`/providers/${providerId}`, config);
}

export const addProvider = (provider: any): Promise<any> => {
    return axios.post(`/providers`, provider, config);
}

export const updateProvider = (providerId: number, provider: any): Promise<any> => {
    return axios.put(`/providers/${providerId}`, provider, config);
}
