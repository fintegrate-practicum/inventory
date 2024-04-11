import axiosInstance from "../httpSrvice";
const httpSrvice = await axiosInstance();

export const getAllProviders = (businessId: number): Promise<any> => {
    return httpSrvice.get(`/providers/${businessId}`);
}

export const deleteProvider = (providerId: number): Promise<any> => {
    return httpSrvice.delete(`/providers/${providerId}`);
}

export const addProvider = (provider: any): Promise<any> => {
    return httpSrvice.post(`/providers`, provider);
}

export const updateProvider = (providerId: number, provider: any): Promise<any> => {
    return httpSrvice.put(`/providers/${providerId}`, provider);
}
