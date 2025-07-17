import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./features/products/productSlice";
import { userReducer } from "./features/tenants/userSlice";
import { inventoryReducer } from "./features/tenants/inventorySlice";

const store = configureStore({
    reducer:{
        'products':productReducer,
        'users':userReducer,
        'inventory':inventoryReducer,
    }
})

export default store;