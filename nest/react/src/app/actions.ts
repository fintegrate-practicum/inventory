import {  PayloadAction } from "@reduxjs/toolkit"

export const deleteItem = (state:any, action:{payload: { [key: string]: any } }) => {
    state.data = state.data.filter((item: { [key: string]: any })  => item.id !== action.payload);
  };
  
  export const addItem = (state:any, action:PayloadAction) => {
    state.data = [...state.data, action.payload];
  };
  
  export const setData = (state:any, action:PayloadAction) => {
    state.data = action.payload;
  };
  

  export const updateItem = (state: any, action: { payload: { [key: string]: any } }) => {
    const updatedIndex = state.data.findIndex((item: { [key: string]: any }) => item.id === action.payload.id);
    if (updatedIndex !== -1) {
        const updatedData = [...state.data];
        updatedData[updatedIndex] = action.payload; 
        state.data = updatedData; 
    }


};
