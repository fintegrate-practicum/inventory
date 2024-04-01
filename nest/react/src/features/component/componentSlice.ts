import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
    componentsArr: []
};

const componentSlice = createSlice({
    name: "component",
    initialState,
    reducers: {

        deleteComponent: (state, action: PayloadAction<number>) => {

            state.componentsArr = state.componentsArr.filter(item => item.id !== action.payload);

        },
        addComponent: (state, action) => {

            state.componentsArr = [...state.componentsArr, action.payload];

        },
        getAllComponents:(state, action)=>{
        
            state.componentsArr = action.payload;

        },
        updateComponent: (state, action) => {
            const updatedIndex = state.componentsArr.findIndex(item => item.id === action.payload.id);
            if (updatedIndex !== -1) {
                state.componentsArr[updatedIndex] = action.payload;
            }
        }


    }
});

export const { deleteComponent, addComponent,getAllComponents,updateComponent } = componentSlice.actions;
export default componentSlice.reducer;
