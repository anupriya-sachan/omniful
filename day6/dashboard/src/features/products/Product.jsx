import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../tenants/userSlice";
import { fetchProducts } from "./productSlice";
import { fetchInventory, getInventoryById, incrementProduct } from "../tenants/inventorySlice";
import { useEffect } from "react";

function ProductCard({ title, quantity, productId, inventoryId }) {
  const dispatch = useDispatch();
  const data = useSelector((state)=>state.inventory);

  function onIncrement(){
    const item = dispatch(incrementProduct({productId:1,inventoryId:'inv-1'}));
    console.log(item);
  }
  
  useEffect(()=>{
      async function fetchAll(){
          await dispatch(fetchUsers());
          await dispatch(fetchProducts());
          await dispatch(fetchInventory());
      }
      fetchAll();
      console.log(data);
  },[dispatch]);

  useEffect(()=>{
    console.log(data);
  },[data]);

  //if quantity is 0 set out of stock and freeze on click operation for decrement
  return (
    <div className="flex justify-between items-center px-4 py-3 border rounded-xl shadow-sm bg-white hover:bg-gray-50">
      <div className="flex flex-col">
        <p className="font-semibold text-lg text-gray-800">{title}</p>
        <p className="text-sm text-gray-500">Qty: {quantity}</p>
      </div>

    
      <div className="flex items-center space-x-3">
        <button
          //onClick={onDecrement}
          disabled={quantity <= 0}
          className="p-2 rounded-md bg-purple-100 text-purple-800 hover:bg-purple-200 disabled:opacity-50"
        >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
        </svg>

        </button>
        <button
          onClick={onIncrement}
          className="p-2 rounded-md bg-purple-100 text-purple-800 hover:bg-purple-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>

        </button>
        <button
          //onClick={onDelete}
          className="p-2 rounded-md bg-red-100 text-red-600 hover:bg-red-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>

        </button>
      </div>
    </div>
  );
}

export default ProductCard;

