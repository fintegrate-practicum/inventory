import { configureStore } from "@reduxjs/toolkit";

import productSlice from "./productSlice";
import componentSlice from "./componentSlice";
export const store = configureStore({
    reducer: {
        product: productSlice,
        component: componentSlice,
    }
});
