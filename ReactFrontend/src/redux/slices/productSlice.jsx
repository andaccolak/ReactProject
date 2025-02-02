import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    products: [],
    filteredProducts: [],
    selectedProduct: {},
    loading: false,
};

const BASE_URL = "https://colakandac.com.tr/api";

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
        setProducts: (state, action) => {
            state.products = action.payload;
            state.filteredProducts = action.payload;
        },
        filterProducts: (state, action) => {
            const searchTerm = action.payload.toLowerCase();
            state.filteredProducts = state.products.filter(product =>
                product.productName.toLowerCase().includes(searchTerm)
            );
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
                state.filteredProducts = action.payload;
            });
    },
});

export const { setProducts, filterProducts } = productSlice.actions;
export default productSlice.reducer;