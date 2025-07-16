import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data:[]
}

const bookmarkSlice = createSlice({
    name:'bookmarks',
    initialState,
    reducers:{
        addBookmark(state,action){
            state.data.push(action.payload);
        },
        removeBookmark(state,action){
            state.data = state.data.filter((item)=>item!=action.payload);
        },
    }
})

export const {addBookmark,removeBookmark} = bookmarkSlice.actions;
export const bookmarkReducer = bookmarkSlice.reducer;