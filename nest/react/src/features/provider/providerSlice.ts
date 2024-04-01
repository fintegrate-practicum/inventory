import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
    providersArr: []
};

const providerSlice = createSlice({
    name: "provider",
    initialState,
    reducers: {

        deleteProvider: (state, action: PayloadAction<number>) => {

            state.providersArr = state.providersArr.filter(item => item.id !== action.payload);

        },
        addProvider: (state, action) => {

            state.providersArr = [...state.providersArr, action.payload];

        },
        getAllProviders:(state, action)=>{
        
            state.providersArr = action.payload;

        },
        updateProvider: (state, action) => {
            const updatedIndex = state.providersArr.findIndex(item => item.id === action.payload.id);
            if (updatedIndex !== -1) {
                state.providersArr[updatedIndex] = action.payload;
            }
        }


    }
});

export const { deleteProvider, addProvider,getAllProviders,updateProvider } = providerSlice.actions;
export default providerSlice.reducer;
