import { createSlice } from "@reduxjs/toolkit"

const intialState = {
    role:'',
    username:''
}

const authSlice = createSlice({
    initialState:intialState,
    name:'auth',
    reducers:{
        setLoginValue(state,action){
            state.role = action.payload.role;
            state.username = action.payload.username;
        },
    }
})

export const {setLoginValue} = authSlice.actions;
export const authReducer =  authSlice.reducer;