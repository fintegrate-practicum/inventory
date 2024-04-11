import axiosInstance from "../httpSrvice";
const httpSrvice = await axiosInstance();

export const deleteComponent = (componentId: number): Promise<any> => {
    return httpSrvice.delete(`/component/${componentId}`);
}

export const addComponent = (component: any): Promise<any> => {
    return httpSrvice.post(`/component`, component);
}


export const updateComponent = (componentId: number, component: any): Promise<any> => {
    return httpSrvice.put(`/component/${componentId}`, component);
}

export const updateQuantityComponent = (componentId: number, count: number): Promise<any> => {
    return httpSrvice.put(`/component/${componentId}`, count);
}