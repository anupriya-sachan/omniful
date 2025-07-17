import { useDispatch, useSelector } from "react-redux";
import TenantCard from "./TenantCard";
import { useEffect } from "react";
import { fetchUsers } from "./userSlice";
import { fetchProducts } from "../products/productSlice";
import { fetchInventory } from "./inventorySlice";

function Tenants(){
    

    return(
        <div className="h-full w-full">
            <TenantCard tenantName={"tenat 777"} productCount={450}/>
            <TenantCard tenantName={"tenat 777"} productCount={450}/>

        </div>
    )
}

export default Tenants;