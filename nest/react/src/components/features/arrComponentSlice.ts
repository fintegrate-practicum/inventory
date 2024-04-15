import { createSlice } from "@reduxjs/toolkit";
import { deleteComponent, addComponent, allComponents } from "../app/actions";


const initialState = {
    data: []
};

const arrComponentSlice = createSlice({
    name: "arrComponent",
    initialState,
    reducers: {
        deleteComponentFromArr: deleteComponent,
        addComponentToArr: addComponent,
        getAllComponents: allComponents
    }

});
export const { deleteComponentFromArr, addComponentToArr, getAllComponents } = arrComponentSlice.actions;
export default arrComponentSlice.reducer;