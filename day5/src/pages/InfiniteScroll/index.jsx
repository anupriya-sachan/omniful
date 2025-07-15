import { useEffect, useState } from "react"
import useInifiniteScroll from "./useInfiniteScroll";

const InfiniteScroll =() => {
   const [data,setData] = useState([]);
   const [page,setPage] = useState(1);

   async function fetchData(){
        const res = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=10`);
        const resp = await res.json();

        setData((data)=>[...data,...resp]);
        setPage((p)=>p+1);
   }

   useEffect(()=>{
        fetchData();
   },[])

    const {scrollRef,isLoading} = useInifiniteScroll({callback:fetchData,threshold:200});

    return(
        <>
        <div className="h-screen w-screen overflow-auto flex flex-wrap" ref={scrollRef}>
            {data.map((item,index)=>{
                return <ImageCard url={item.download_url} key={index} author={item.author}/>
            })}
            {isLoading && <p className="absolute bottom-0 left-0 right-0 text-center text-gray-200">Loading...</p>}
        </div>
        </>
    )
}

function ImageCard({url,author}){
    return(
        <div className="h-80 w-2/5 m-10">
            <div className="h-80 w-full">
                <img src={url} alt={`image by - ${author}`} className="h-full w-full rounded-lg"/>
            </div>
            <div></div>
        </div>
    )
}


export default InfiniteScroll;