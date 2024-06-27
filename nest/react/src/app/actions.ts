import { PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../interfaces/IProduct";
import { IComponent } from "../interfaces/IComponent";

export interface State<T extends IProduct | IComponent> {
  data: T[];
}

export const deleteItem = <T extends IProduct | IComponent>(state: State<T>, action: PayloadAction<T['id']>) => {
  return {
    ...state,
    data: state.data.filter((item) => item.id !== action.payload),
  };
};

export const addItem = <T extends IProduct | IComponent>(state: State<T>, action: PayloadAction<T>) => {
  return {
    ...state,
    data: [...state.data, action.payload],
  };
};

export const setData = <T extends IProduct | IComponent>(state: State<T>, action: PayloadAction<T>) => {
  return {
    ...state,
    data: action.payload,
  };
};

export const updateItem = <T extends IProduct | IComponent>(state: State<T>, action: PayloadAction<T>) => {
  const updatedState = { ...state };
  const updatedIndex = updatedState.data.findIndex((item) => item.id === action.payload.id);
  if (updatedIndex !== -1) {
    const updatedData = [...updatedState.data];
    updatedData[updatedIndex] = action.payload;
    updatedState.data = updatedData;
  }
  return updatedState;
};
