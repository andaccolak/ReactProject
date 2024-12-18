import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    products: [],
    selectedProduct: {},
    loading: false,
};
const BASE_URL ="https://fakestoreapi.com";

export const getAllProduct = createAsyncThunk("getAllProduct", async () => {
    const response = await axios.get(`${BASE_URL}/products`);
    console.log(response.data.data);
    return response.data;
});

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
setselectedProduct:(state,action)=>{
    state.selectedProduct = action.payload;
}
    },
    extraReducers: (builder) => {
     builder.addCase(getAllProduct.pending, (state)=>{
        state.loading = true;
     })
     builder.addCase(getAllProduct.fulfilled, (state,action)=>{
        state.loading = false;
        state.products = action.payload;
     })
    },
});
export const { } = productSlice.actions;
export default productSlice.reducer;
