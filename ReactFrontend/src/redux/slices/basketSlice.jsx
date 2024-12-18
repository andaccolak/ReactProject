import {createSlice} from '@reduxjs/toolkit'

const getBasketFromStorage=()=>{
    if(localStorage.getItem("basket")){
        return JSON.parse(localStorage.getItem("basket"));
    }
    return[];
}
const initialState ={
    products:getBasketFromStorage(),
    drawer : false,
    totalAmount :0
}

const writeFromBasketToStorage= (basket) => {
    localStorage.setItem("basket", JSON.stringify(basket))
}


export const basketSlice = createSlice({
    name:"basket",
    initialState,
    reducers:{
        addToBasket: (state, action) => {
            const findProduct = state.products.find((product) => product.id === action.payload.id);
            if (findProduct) {
                // Ürün daha önceden eklenmiştir, sadece sayısını 1 artır
                findProduct.count += 1;
            } else {
                // Ürün sepette yok, sayısını 1 yaparak sepete ekle
                action.payload.count = 1;
                state.products = [...state.products, action.payload];
            }
            writeFromBasketToStorage(state.products);
        },
        decreaseFromBasket: (state, action) => {
            const findProduct = state.products.find((product) => product.id === action.payload.id);
            if (findProduct) {
                if (findProduct.count > 1) {
                    // Ürün sayısını 1 azalt
                    findProduct.count -= 1;
                } else {
                    // Ürün sayısı 1 ise, ürünü sepetten kaldır
                    state.products = state.products.filter((product) => product.id !== action.payload.id);
                }
            }
            writeFromBasketToStorage(state.products);
        },
        setDrawer : (state)=>{
            state.drawer = !state.drawer
        },
        calculateBasket: (state) => {
            state.totalAmount = 0;
            state.products && state.products.map((product) => {
            state.totalAmount += product.price * product.count;
            })
        },
        removeProduct:(state, action) => {
            const findProduct = state.products.find((product) => product.id === action.payload.id);
            if (findProduct) {
                    state.products = state.products.filter((product) => product.id !== action.payload.id);
            }
            writeFromBasketToStorage(state.products);
        },
        
        
    }
})
export const { addToBasket,decreaseFromBasket, setDrawer, calculateBasket,removeProduct } = basketSlice.actions
export default basketSlice.reducer