import { useNavigate } from "react-router-dom";
import TenantCard from "./TenantCard";
import { fetchInventory } from "./inventorySlice";
import { fetchUsers } from "./userSlice";
import { fetchProducts } from "../products/productSlice";
import { useEffect } from "react";

import { useSelector, useDispatch } from 'react-redux';

function Tenants(){
    //implement lazy loading & search
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const inventory = useSelector((state)=>state.inventory);
    const products = useSelector((state)=>state.products);
    const users = useSelector((state)=>state.users);

    useEffect(() => {
        async function fetchAll(){
            if (!users || users.ids.length === 0) {
                await dispatch(fetchUsers());
            }
            if (!products || products.ids.length === 0) {
                await dispatch(fetchProducts());
            }
            if (!inventory || inventory.ids.length === 0) {
                await dispatch(fetchInventory());
            }
        }
        fetchAll();
        
    }, [dispatch,users.ids.length, products.ids.length, inventory.ids.length]);

    useEffect(()=>{
        console.log(products);
    },[products]);

    function getActive(id) {
        const inventoryEntity = inventory.entities[users.entities[id].inv];
        if (!inventoryEntity || !inventoryEntity.items) return 0; 

        const active = inventoryEntity.items.filter((item) => item.quantity > 0);
        return active.length;
    }


    function handleClick(userId) {
        navigate(`/products/${(userId)}`);
    }

    if (users.loading || inventory.loading || products.loading) {
        return <p className="text-center p-4">Loading tenants...</p>;
    }
    else{
    return(
        <div className="h-full w-full">
            {users.ids.map((user)=>{
                console.log(inventory);
                console.log(users.entities[user].inv);
                
                return(
                    <div onClick={() => handleClick(user)}>
                        <TenantCard key={user}
                                tenantName={users.entities[user].name}
                                productCount={inventory.entities[users.entities[user].inv]?.items?.length || 0}
                                activeProducts={getActive(user)}
                            />
                    </div>
                );
            })}
        </div>
    )
    }
}

export default Tenants;