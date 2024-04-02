import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const config = {
    baseURL: process.env.BASE_URL
}

export const getAllProductsAdmin = (adminId: number): Promise<any> => {
    return axios.get(`/product/${adminId}`, config);
}

export const deleteProduct = (productId: number): Promise<any> => {
    return axios.delete(`/product/${productId}`, config);
}

export const addProduct = (product: any): Promise<any> => {
    return axios.post(`/product`, product, config);
}

export const updateProduct = (productId: number, product: any): Promise<any> => {
    return axios.put(`/product/${productId}`, product, config);
}

export const updateProductsPrice = (adminId: number, percent: number): Promise<any> => {
    const data = {
        percent,
    };
    return axios.put(`/product/${adminId}`, data, config);
}

export const getAllProductsCustomer = (businessId: number): Promise<any> => {
    return axios.get(`/product/${businessId}`, config);
}

export const getProductById = (productId: number): Promise<any> => {
    return axios.get(`/product/${productId}`, config);
}