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
    initialState: {
        products: [], // Ürünler burada saklanır
        loading: false,
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload; // Gelen ürünleri Redux state'ine kaydet
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            });
    },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
