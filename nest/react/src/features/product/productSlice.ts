import { createSlice } from "@reduxjs/toolkit";
import { deleteItem, setData, addItem, updateItem, State } from "../../app/actions";
import { IProduct } from "../../interfaces/IProduct";

const initialState: State<IProduct> = {
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
