import { useFieldArray, useForm } from "react-hook-form";
import InfoCard from "./InfoCard";
import { useDispatch, useSelector } from "react-redux";
import { updatePrevOrders } from "../order/orderSlice";
import { exportToCSV } from "../../utils";

const Dashboard = () => {
    const orderDetails = useSelector((state)=>state.orders);
    const dispatch = useDispatch();    

    const {register, control, handleSubmit, resetField} = useForm({
        defaultValues:{
            orders:orderDetails
        }
    });

    const {fields, update, append,remove} = useFieldArray({
        control,
        name:'orders'
    });

    const handleViewDetails = (order) => {
        console.log(order.orderId);
        //navigate(`/orders/${orderId}`);
    }

    const onSubmit = (data) => {
        console.log(data);
        dispatch(updatePrevOrders(data));
    }

    return(
         <div className="h-screen w-full flex flex-col bg-gray-100">
            <div className="w-full p-4 flex h-32 justify-around items-center bg-white shadow-sm mb-4">
                <InfoCard Heading={"Total Orders"} Value={1225} />
                <InfoCard Heading={"Shipped Orders"} Value={1005} />
                <InfoCard Heading={"Canceled Orders"} Value={25} />
            </div>
            {/*handle submit to update redux state */}
           <div className="flex-grow p-4 relative overflow-hidden"> 
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col"> 
                    <div className="sticky top-0 bg-white z-10 flex justify-between items-center mb-6 border-b pb-4 pt-0">
                        <h2 className="text-2xl font-semibold text-gray-800">Order List</h2>
                        <div className="flex">
                            <button
                                type="button"
                                className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mx-2"
                            >
                                Add Order
                            </button>
                            <button
                                type="button"
                                onClick={()=>exportToCSV(orderDetails)}
                                className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mx-2"
                            >
                                Export to CSV
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mx-2"
                            >
                                Save All Changes
                            </button>
                        </div>
                    </div>
                    <div className="space-y-4 overflow-y-auto">
                        {fields.map((field, index) => (
                            <div
                                key={field.id} 
                                className="flex items-center gap-4 bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm"
                            >
                                <div className="flex flex-col flex-1 min-w-[100px]">
                                    <label htmlFor={`orderId-${index}`} className="text-xs text-gray-500 mb-1">Order ID</label>
                                    <input
                                        id={`orderId-${index}`}
                                        type="text"
                                        {...register(`orders.${index}.orderId`)}
                                        placeholder="Order ID"
                                        defaultValue={field.orderId} 
                                        className="p-2 rounded border border-gray-300 w-full"
                                    />
                                </div>
                                <div className="flex flex-col flex-1 min-w-[150px]">
                                    <label htmlFor={`cName-${index}`} className="text-xs text-gray-500 mb-1">Customer Name</label>
                                    <input
                                        id={`cName-${index}`}
                                        type="text"
                                        {...register(`orders.${index}.cName`)}
                                        placeholder="Customer Name"
                                        defaultValue={field.cName}
                                        className="p-2 rounded border border-gray-300 w-full"
                                    />
                                </div>
                                <div className="flex flex-col flex-1 min-w-[120px]">
                                    <label htmlFor={`date-${index}`} className="text-xs text-gray-500 mb-1">Order Date</label>
                                    <input
                                        id={`date-${index}`}
                                        type="date"
                                        {...register(`orders.${index}.orderDate`)}
                                        defaultValue={field.date}
                                        className="p-2 rounded border border-gray-300 w-full"
                                    />
                                </div>
                                <div className="flex flex-col flex-1 min-w-[120px]">
                                    <label htmlFor={`repName-${index}`} className="text-xs text-gray-500 mb-1">Sales Rep</label>
                                    <input
                                        id={`repName-${index}`}
                                        type="text"
                                        {...register(`orders.${index}.repName`)}
                                        placeholder="Sales Rep"
                                        defaultValue={field.repName}
                                        className="p-2 rounded border border-gray-300 w-full"
                                    />
                                </div>
                                <div className="flex flex-col flex-1 min-w-[80px]">
                                    <label htmlFor={`amount-${index}`} className="text-xs text-gray-500 mb-1">Amount</label>
                                    <input
                                        id={`amount-${index}`}
                                        type="number"
                                        {...register(`orders.${index}.amount`, { valueAsNumber: true })} 
                                        placeholder="Amount"
                                        defaultValue={field.amount}
                                        className="p-2 rounded border border-gray-300 w-full"
                                    />
                                </div>
                                <div className="flex flex-col flex-1 min-w-[100px]">
                                    <label htmlFor={`status-${index}`} className="text-xs text-gray-500 mb-1">Status</label>
                                    <select
                                        id={`status-${index}`}
                                        {...register(`orders.${index}.status`)}
                                        defaultValue={field.status}
                                        className="p-2 rounded border border-gray-300 w-full bg-white"
                                    >
                                        <option value="Draft">Draft</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </div>
                                <div className="flex gap-2 ml-4">
                                    <button
                                        type="button"
                                        onClick={() => handleViewDetails(field)}
                                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors duration-200"
                                        title="View Details"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                                        </svg>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => resetField(`orders.${index}`)} 
                                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                        title="Revert Changes"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                                        </svg>
                                    </button>
                                    <button
                                        type="button" 
                                        onClick={() => remove(index)}
                                        className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors duration-200"
                                        title="Remove Row"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-400">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Dashboard;