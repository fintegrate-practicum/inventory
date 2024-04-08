import {  PayloadAction } from "@reduxjs/toolkit";
  

export const deleteItem = (state: any, action: PayloadAction<string>) => {
    state.data = state.data.filter((item: { id: string }) => item.id !== action.payload);
};

  export const addItem = (state:any, action:PayloadAction) => {
    state.data = [...state.data, action.payload];
  };
  
  export const setData = (state:any, action:PayloadAction) => {
    state.data = action.payload;
  };
  

  export const updateItem = (state: any, action:PayloadAction<{ [key: string]: any }>) => {
    const updatedIndex = state.data.findIndex((item: { [key: string]: any }) => item.id === action.payload.id);
    if (updatedIndex !== -1) {
        const updatedData = [...state.data];
        updatedData[updatedIndex] = action.payload; 
        state.data = updatedData; 
    }


};
