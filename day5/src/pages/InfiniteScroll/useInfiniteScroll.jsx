import { useEffect, useRef, useState } from "react";

function useInifiniteScroll({callback,threshold=300}){
    const [isLoading,setIsLoading] = useState(false);
    const [data,setData] = useState([]);
    const [page,setPage] = useState(1);

    const scrollRef = useRef();

    function handleScroll(){
        const refValues = scrollRef.current;

        if(refValues.scrollTop+refValues.clientHeight >= refValues.scrollHeight-threshold){
            if(!isLoading){
                setIsLoading(true);
                callback().finally(()=>{
                    setIsLoading(false);
                });
            }
        }
    }

    useEffect(()=>{
        scrollRef.current.addEventListener("scroll",handleScroll,true);

        return () => {
            if(scrollRef.current){
                scrollRef.current.removeEventListener("scroll",handleScroll,true);
            }}

    },[callback,threshold]);

    return {scrollRef,isLoading};
}

export default useInifiniteScroll;