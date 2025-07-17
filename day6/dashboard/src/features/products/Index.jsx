import ProductCard from "./Product";
//add search

function Products(){
    
    return(
        <>  
            <div className="tracking-wide font-extrabold text-2xl p-4">Products</div>
            <div className="h-full w-full grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4 px-5">
                <ProductCard title={"yayaya"} quantity={56}/> 
            </div>
        </>
        
    )
}

export default Products;