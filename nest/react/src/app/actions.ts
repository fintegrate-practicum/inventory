import { PayloadAction } from "@reduxjs/toolkit";


export interface Item {
  id: string;
}

export interface State<T extends Item> {
  data: T[];
}

export const deleteItem = <T extends Item>(state: State<T>, action: PayloadAction<T['id']>) => {
  return {
    ...state,
    data: state.data.filter((item) => item.id !== action.payload),
  };
};

export const addItem =<T extends Item> (state: State<T>, action: PayloadAction<T>) => {
  return{
    ...state,
    data : [...state.data, action.payload],
  };
};

export const setData =<T extends Item> (state: State<T>, action: PayloadAction<T[]>) => {
  return{
    ...state,
    data : action.payload,
  };
};

export const updateItem =<T extends Item> (state: State<T>, action: PayloadAction<T>) => {
  const updatedIndex = state.data.findIndex((item) => item.id === action.payload.id);
  if (updatedIndex !== -1) {
    const updatedData = [...state.data];
    updatedData[updatedIndex] = action.payload;
    state.data = updatedData;
  }
};
