import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./features/products/productSlice";
import { userReducer } from "./features/tenants/userSlice";
import { inventoryReducer } from "./features/tenants/inventorySlice";
import createIndexedDBStorage from 'redux-persist-indexeddb-storage';
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import { auditReducer } from "./features/logs/auditSlice";
import auditMiddleware from "./middleware/audit";

const indexedDBStorage = createIndexedDBStorage('myIndexedDB', 'myDataStore');

const persistConfig = {
  key: 'root', //key with which data is saved         
  storage: indexedDBStorage, 
};

const rootReducer = combineReducers({
    'products':productReducer,
    'users':userReducer,
    'inventory':inventoryReducer,
    'audits':auditReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer); //automatically persist to indexdb and rehydrate

export const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist - Redux persist may handle non-serializable values (like the store state) that would otherwise trigger warnings.
    }).concat(auditMiddleware),
})

export const persistor = persistStore(store); //ensure state is both persisted and stored
export default store;