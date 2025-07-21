import { createSlice } from "@reduxjs/toolkit"

const initialState = [
  {
    orderId: "ORD001",
    cName: "Acme Corp",
    customerEmail: "contact@acme.com",
    customerPhone: "+91 9876543210",
    orderDate: "2025-07-10",
    deliveryDate: "2025-07-20",
    shippingAddress: {
      line1: "123 Industrial Area",
      line2: "Phase II",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001"
    },
    billingAddress: {
      line1: "456 Corporate Park",
      line2: "",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400002"
    },
    products: [
      {
        productId: "P101",
        name: "Steel Rod",
        quantity: 10,
        price: 1500
      },
      {
        productId: "P102",
        name: "Bolt Set",
        quantity: 50,
        price: 20
      }
    ],
    amount: 15500,
    status: "Processing",
    repName: "rep01",
    notes: "Urgent delivery requested",
    documents: [],
    createdBy: "admin01",
    createdAt: "2025-07-10T08:30:00Z",
    updatedAt: "2025-07-11T10:00:00Z"
  },
  {
    orderId: "ORD002",
    cName: "Beta Ltd",
    customerEmail: "info@beta.com",
    customerPhone: "+91 9123456789",
    orderDate: "2025-07-08",
    deliveryDate: "2025-07-18",
    shippingAddress: {
      line1: "78 Main Street",
      line2: "Sector 45",
      city: "Delhi",
      state: "Delhi",
      pincode: "110020"
    },
    billingAddress: {
      line1: "78 Main Street",
      line2: "Sector 45",
      city: "Delhi",
      state: "Delhi",
      pincode: "110020"
    },
    products: [
      {
        productId: "P103",
        name: "Copper Wire",
        quantity: 20,
        price: 500
      }
    ],
    amount: 10000,
    status: "Shipped",
    repName: "rep02",
    notes: "",
    documents: [],
    createdBy: "admin02",
    createdAt: "2025-07-08T14:45:00Z",
    updatedAt: "2025-07-12T09:20:00Z"
  },
  {
    orderId: "ORD003",
    cName: "Gamma Traders",
    customerEmail: "sales@gammatraders.in",
    customerPhone: "+919988776655",
    orderDate: "2025-07-05",
    deliveryDate: "2025-07-15",
    shippingAddress: {
      line1: "Plot 5",
      line2: "Electronic City",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560100"
    },
    billingAddress: {
      line1: "Plot 5",
      line2: "Electronic City",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560100"
    },
    products: [
      {
        productId: "P104",
        name: "Plastic Tubes",
        quantity: 100,
        price: 10
      }
    ],
    amount: 1000,
    status: "Delivered",
    repName: "rep01",
    notes: "Delivered on time",
    documents: [],
    createdBy: "admin01",
    createdAt: "2025-07-05T11:00:00Z",
    updatedAt: "2025-07-16T16:30:00Z"
  }
];

const orderSlice = createSlice({
    initialState:initialState,
    name:'orders',
    reducers:{
        setNewOrder(state,action){
          const data = {
            createdAt:new Date(),
            updatedAt:Date.now(),
            ...action.payload
          }
          state.push(data);
            
        },
        updatePrevOrders(state,action){
            if (Array.isArray(action.payload)) {
              return action.payload;
            }
            return state;
        }
    }
})

export const orderReducer = orderSlice.reducer;
export const {setNewOrder,updatePrevOrders} = orderSlice.actions;
