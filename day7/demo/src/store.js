import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import createIndexedDBStorage from 'redux-persist-indexeddb-storage';

import { authReducer } from "./features/auth/authSlice";
import { orderReducer } from "./features/order/orderSlice";

const indexedDBStorage = createIndexedDBStorage('myIndexedDB', 'myDataStore');

const persistConfig = {
  key: 'root', //key with which data is saved         
  storage: indexedDBStorage, 
};

const rootReducer = combineReducers({
    'auth':authReducer,
    'orders':orderReducer,
})

const persistedReducer = persistReducer(persistConfig,rootReducer);

const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist - Redux persist may handle non-serializable values (like the store state).
    }),
})

export const persistor = persistStore(store);
export default store;