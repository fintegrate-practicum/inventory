import { createSlice } from "@reduxjs/toolkit";
import { deleteItem,setData,addItem,updateItem } from "../../app/actions";

const initialState = {
    data: []
};

const providerSlice = createSlice({
    name: "provider",
    initialState,
    reducers: {

        deleteProvider:deleteItem,
        addProvider: addItem,
        getAllProviders:setData,
        updateProvider:updateItem
    }
});

export const { deleteProvider, addProvider,getAllProviders,updateProvider } = providerSlice.actions;
export default providerSlice.reducer;
