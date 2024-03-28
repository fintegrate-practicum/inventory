import axios from 'axios';
import {baseUrl} from '../config';

//administrator permissions
export const deleteComponent=(componentId:number):Promise<void>=>{
    return axios.delete(`${baseUrl}/api/inventory/${componentId}`);
}

export const addComponent=(component:any)=>{
    return axios.post(`${baseUrl}/api/inventory`,component);
}


export const updateComponent=(componentId:number,component:any)=>{
    return axios.put(`${baseUrl}/api/inventory/${componentId}`,component);
}

//client permissions

export const updateQuantityComponent=(componentId:number,count:number)=>{
    return axios.put(`${baseUrl}/api/inventory/${componentId}`,count);
}