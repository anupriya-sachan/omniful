import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";


const userAdapter = createEntityAdapter();

export const fetchUsers = createAsyncThunk(
    'users/fetch',
    async (thunkAPI)=>{
        const res = await fetch('https://dummyjson.com/users?limit=100');
        const data = await res.json();
        const users = data.users;
        return users.map((user,)=>(
            {
                id:user.id,
                name:user.firstName+" "+user.lastName,
                inv:`inv-${user.id}`
            }
        ))
    }
)

const initialState = userAdapter.getInitialState({
    loading:false,
})

const usersSlice = createSlice({
    name:"users",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchUsers.pending,(state,action)=>{
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled,(state,action)=>{
                console.log(action.payload);
                
                state.loading=false;
                userAdapter.setAll(state,action.payload);
            })
            .addCase(fetchUsers.rejected,(state,action)=>{
                state.loading=false;
            })
    }
})

export const userReducer = usersSlice.reducer;

export const {
    selectAll:getAllUsers,
    selectById:getUserById,
} = userAdapter.getSelectors((state)=>state.users);