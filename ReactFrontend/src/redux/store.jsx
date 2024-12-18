import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appSlice";
import productReducer from "./slices/productSlice";
import basketReducer from "./slices/basketSlice.jsx";

export const store = configureStore({
    reducer: {
        app: appReducer,
        product: productReducer,
        basket:basketReducer
    },
});


