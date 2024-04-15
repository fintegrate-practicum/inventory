import { configureStore } from "@reduxjs/toolkit";
import arrComponentSlice from "../features/arrComponentSlice";

export const arrComponentStore = configureStore({
    reducer: {
        arrComponent: arrComponentSlice
    }
});