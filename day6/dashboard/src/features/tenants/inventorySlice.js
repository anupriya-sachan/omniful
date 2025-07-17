import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const inventoryAdapter = createEntityAdapter();

export const fetchInventory = createAsyncThunk(
    'inventory/fetch',
    async (_,thunkAPI) =>{
        const state = await thunkAPI.getState(); //gives the whole state
        const users = Object.values(state.users.entities);
        const productIds = state.products.ids.slice(0,100); //get all product ids to map

        const inventory = users.map((user)=>({
            id:user.inv,
            items:productIds.map((productId)=>({
                productId,
                quantity:100,
            }))
        }))        
        
        return inventory;
    }
)

const initialState = inventoryAdapter.getInitialState({
    loading:false,
})

const inventorySlice = createSlice({
    name:"inventory",
    initialState,
    reducers:{
        incrementProduct(state,action){
            const {inventoryId,productId} = action.payload;
            const inventory = state.entities[inventoryId];

            if(!inventory){
                //inventory does not exist
                return;
            }
            const listing = inventory.items.find((i)=>i.productId==productId); //get the item with that product id
            if(listing){
                listing.quantity+=1;
            }
        },
        decrementProduct(state,action){
            const {inventoryId,productId} = action.payload;
            const inventory = state.entities[inventoryId];
            if(!inventory){
                //inventory does not exist
                return;
            }
            const listing = inventory.items.find((i)=>i.productId==productId); //get the item with that product id
            
            if(listing  && listing.quantity>0){
                listing.quantity-=1;
            }

        },
        removeProduct(state,action){
            const {inventoryId,productId} = action.payload;
            const inventory = state.entities[inventoryId];
            if(!inventory){
                //inventory does not exist
                return;
            }
            console.log(inventory.items);
            inventory.items = inventory.items.filter((i)=> i.productId!=productId);
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchInventory.pending,(state,action)=>{
                state.loading = true;
            })
            .addCase(fetchInventory.fulfilled,(state,action)=>{
                state.loading=false;
                inventoryAdapter.setAll(state,action.payload);
            })
            .addCase(fetchInventory.rejected,(state,action)=>{
                state.loading=false;
            })
        }
})

export const inventoryReducer = inventorySlice.reducer;

export const {incrementProduct,decrementProduct,removeProduct} = inventorySlice.actions;

export const {
    selectAll:getAllInventories,
    selectById:getInventoryById,
} = inventoryAdapter.getSelectors((state)=>state.inventory);

