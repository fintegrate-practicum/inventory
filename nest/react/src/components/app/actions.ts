import { PayloadAction } from "@reduxjs/toolkit";

export interface Component {
    name: string,
    purchasePrice: number
}

export interface State {
    data: Component[];
}

export const deleteComponent = (state: State, action: PayloadAction<string>) => {
    state.data = state.data.filter((item) => item.name !== action.payload);
}

export const addComponent = (state: State, action: PayloadAction<Component>) => {
    state.data = [...state.data, action.payload];
};

export const allComponents = (state: State, action: PayloadAction<Component[]>) => {
    state.data = action.payload;
};