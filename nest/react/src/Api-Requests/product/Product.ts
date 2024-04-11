import axiosInstance from "../httpSrvice";
const httpSrvice = await axiosInstance();

export const getAllProductsAdmin = (adminId: number): Promise<any> => {
    return httpSrvice.get(`/product/${adminId}`);
}

export const deleteProduct = (productId: number): Promise<any> => {
    return httpSrvice.delete(`/product/${productId}`);
}

export const addProduct = (product: any): Promise<any> => {
    return httpSrvice.post(`/product`, product);
}

export const updateProduct = (productId: number, product: any): Promise<any> => {
    return httpSrvice.put(`/product/${productId}`, product);
}

export const updateProductsPrice = (adminId: number, percent: number): Promise<any> => {
    return httpSrvice.put(`/product/${adminId}`, percent);
}

export const getAllProductsCustomer = (businessId: number): Promise<any> => {
    return httpSrvice.get(`/product/${businessId}`);
}

export const getProductById = (productId: number): Promise<any> => {
    return httpSrvice.get(`/product/${productId}`);
}