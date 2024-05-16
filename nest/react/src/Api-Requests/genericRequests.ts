import httpSrvice from "./httpSrvice";

export const getItemById = <T>(route: string, id: number) => {
    return httpSrvice.get<T>(`/${route}/${id}`);
};
export const getAllItems = <T>(route: string, businessId: number) => {
    return httpSrvice.get<T>(`/${route}/${businessId}`);
};
export const deleteItem = <T>(route: string, id: number) => {
    return httpSrvice.delete<T>(`/${route}/${id}`);
};

export const addItem = <T>(route: string, item: T) => {
    return httpSrvice.post<T>(`/${route}`, item);
};

export const updateItem = <T>(route: string, id: number, item: T) => {
    return httpSrvice.put<T>(`/${route}/${id}`, item);
};