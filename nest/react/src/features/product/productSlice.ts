import { createSlice} from "@reduxjs/toolkit";
import { deleteItem,setData,addItem,updateItem } from "../../app/actions";


const initialState = {
    data: []
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
       
        deleteProduct: deleteItem,
        addProduct: addItem,
        getProductsAdmin:setData,
        updateProduct:updateItem
    }
});

export const { deleteProduct, addProduct,getProductsAdmin,updateProduct } = productSlice.actions;
export default productSlice.reducer;
