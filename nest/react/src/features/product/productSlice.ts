import { createSlice } from "@reduxjs/toolkit";
import { deleteItem, setData, addItem, updateItem, State } from "../../app/actions";
import { Component } from "../component/componentSlice";

export interface Product {
    id: string;
    productName: string;
    productDescription: string;
    componentsImages: string[];
    productComponents: Component[];
    packageCost: number;
    totalPrice: number;
    adminId: string;
    isActive: boolean;
    isOnSale: boolean;
    salePercentage: number;
    stockQuantity: number;
    bussinesId: string;
    componentStatus: string;
}

const initialState: State<Product> = {
    data: [],
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        deleteProduct: deleteItem,
        addProduct: addItem,
        getProductsAdmin: setData,
        updateProduct: updateItem,
    }
});

export const { deleteProduct, addProduct, getProductsAdmin, updateProduct } = productSlice.actions;
export default productSlice.reducer;
