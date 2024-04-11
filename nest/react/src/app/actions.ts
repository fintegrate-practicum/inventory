import { PayloadAction } from "@reduxjs/toolkit";


export interface Item {
  id: string;
}

export interface State {
  data: Item[];
}

export const deleteItem = (state: State, action: PayloadAction<string>) => {
  state.data = state.data.filter((item) => item.id !== action.payload);
};

export const addItem = (state: State, action: PayloadAction<Item>) => {
  state.data = [...state.data, action.payload];
};

export const setData = (state: State, action: PayloadAction<Item[]>) => {
  state.data = action.payload;
};

export const updateItem = (state: State, action: PayloadAction<Item>) => {
  const updatedIndex = state.data.findIndex((item) => item.id === action.payload.id);
  if (updatedIndex !== -1) {
    const updatedData = [...state.data];
    updatedData[updatedIndex] = action.payload;
    state.data = updatedData;
  }
};
