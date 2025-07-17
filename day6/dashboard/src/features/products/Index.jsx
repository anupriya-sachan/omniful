import { useParams } from "react-router-dom";
import ProductCard from "./Product";
import { useSelector } from "react-redux";
import { getInventoryByUserId } from "../tenants/userUtils";

//add search

function Products(){
    const {userId} = useParams();
    const items = useSelector((state)=>getInventoryByUserId(state,userId));

    return(
        <>  
        <nav className='h-16 bg-purple-500 w-full flex'>
        </nav>
        <div className='min-h-screen min-w-full bg-white'>
            <div className="tracking-wide font-extrabold text-2xl p-4">Products</div>
            <div className="h-full w-full grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4 px-5">
                {items.map((product) => (
                    <ProductCard
                        key={product.productId}
                        productId={product.productId}
                        userId={userId}
                    />
                ))}
            </div>
        </div>
        </>
    )
}

export default Products;