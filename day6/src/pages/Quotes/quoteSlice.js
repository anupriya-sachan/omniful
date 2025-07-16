import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'


//exported to be used directly like reducers
export const fetchQuotes = createAsyncThunk(
  'quotes/fetchQuotes', //action type string
  async ( thunkAPI) => {
    const response = await fetch("https://dummyjson.com/quotes").then(
        (data) => data.json()
    );
    return response.quotes;
  },
)

const initialState = {
  quotes: [],
  loading: false,
}

//immer converts mutable logic to immutable
export const quoteSlice = createSlice({
  name: 'quotes', //this is used in useSelector
  initialState,
  reducers: {},
  extraReducers : (builder)=> {
    builder.addCase(fetchQuotes.pending,(state) =>{
        state.loading = true;
    }),
    builder.addCase(fetchQuotes.fulfilled,(state,{payload})=>{
        state.loading=false;
        state.quotes = payload;
    }),
    builder.addCase(fetchQuotes.rejected,(state)=>{
        state.loading=false;
    })
  }
})

export const quoteReducer = quoteSlice.reducer; //always exported cause its the slice
