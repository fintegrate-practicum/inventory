import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const config = {
    baseURL: process.env.BASE_URL
}

export const deleteComponent = (componentId: number): Promise<any> => {
    return axios.delete(`/component/${componentId}`, config);
}

export const addComponent = (component: any): Promise<any> => {
    return axios.post(`/component`, component, config);
}


export const updateComponent = (componentId: number, component: any): Promise<any> => {
    return axios.put(`/component/${componentId}`, component, config);
}

export const updateQuantityComponent = (componentId: number, count: number): Promise<any> => {
    return axios.put(`/component/${componentId}`, count, config);
}