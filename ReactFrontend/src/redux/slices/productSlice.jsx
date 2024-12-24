import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    products: [],
    selectedProduct: {},
    loading: false,
};
const BASE_URL = "https://localhost:7240/api";

export const getAllProduct = createAsyncThunk("getAllProduct", async () => {
    const response = await axios.get(`${BASE_URL}/products/list`).catch((error) => {
        console.error("Error fetching products:", error);
    });
    console.log(response.data);
    return response.data;
});

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setselectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProduct.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getAllProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload; // Gelen verilerin doğru olduğundan emin olun
        });

    },
});
export const { } = productSlice.actions;
export default productSlice.reducer;
