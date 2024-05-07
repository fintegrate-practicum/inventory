import { createSlice } from "@reduxjs/toolkit";
import { deleteItem,setData,addItem,updateItem } from "../../app/actions";

const initialState = {
    data: []
};

const componentSlice = createSlice({
    name: "component",
    initialState,
    reducers: {
        deleteComponent:deleteItem,
        addComponent: addItem,
        getAllComponents:setData,
        updateComponent:updateItem
    }
});

export const { deleteComponent, addComponent,getAllComponents,updateComponent } = componentSlice.actions;
export default componentSlice.reducer;
