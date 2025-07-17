import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const productsAdapter = createEntityAdapter(); //gives methods to handle extra reducers 

export const fetchProducts = createAsyncThunk(
    'products/fetch',
    async ()=>{
        const res = await fetch(`https://dummyjson.com/products?limit=150`);
        const data = await res.json();
        const products = data.products;
        return products.map((item)=>({
            id:item.id,
            title:item.title,
            price:item.price,
        }));
    });

//create an initial object with entities array & ids array and all
const initialState = productsAdapter.getInitialState({
  loading: false,
});

const productSlice = createSlice({
    name:'products',
    initialState,
    reducers:{

    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchProducts.pending,(state,action)=>{
            state.loading = true;
        })
        .addCase(fetchProducts.fulfilled,(state,action)=>{
            state.loading=false;
            productsAdapter.setAll(state,action.payload);
        })
        .addCase(fetchProducts.rejected,(state,action)=>{
            state.loading=false;
        })
    }    
})

export const productReducer = productSlice.reducer;

//export default selectors by name
export const {
    selectAll:getAllProducts,
    selectById:getProductById,
} = productsAdapter.getSelectors(state=>state.products);

