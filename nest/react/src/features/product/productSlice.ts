


import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { deleteProduct, addProduct,getAllProductsAdmin } from "../Api-Requests/product/Product.ts";



const initialState = {
    productsArr: []
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        //אני אמורה לעטף כל גישה לשרת בtry catch  
        // לבדוק באיזה צורה לטפל בשגיאות (משהו אחיד בכל הפרויקט וכו)

        //בתחילה רציתי להצמיד את הפעולות של הסטייט לפעולות השרת קצת הסתבך לי השארתי בנתיים כך

        deleteProduct: (state, action: PayloadAction<number>) => {

            // deleteProduct(action.payload);
            state.productsArr = state.productsArr.filter(item => item.id !== action.payload);

        },
        addProduct: (state, action) => {

            // addProduct(action.payload)
            state.productsArr = [...state.productsArr, action.payload];

        },
        getProductsAdmin:(state, action)=>{
            // let res=getAllProductsAdmin(adminID)//מאיפה אני שולפת אותו
            // state.productsArr = res.data;
            state.productsArr = action.payload;

        },
        updateProduct: (state, action) => {
            const updatedIndex = state.productsArr.findIndex(item => item.id === action.payload.id);
            if (updatedIndex !== -1) {
                state.productsArr[updatedIndex] = action.payload;
            }
        }


    }
});

export const { deleteProduct, addProduct,getProductsAdmin,updateProduct } = productSlice.actions;
export default productSlice.reducer;
