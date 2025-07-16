import Card from "./Card"
import { useSelector,useDispatch } from "react-redux";
import { fetchQuotes } from "./quoteSlice";
import { useEffect } from "react";

function Quotes(){
    const dispatch = useDispatch();
    const {quotes,loading} = useSelector((state)=>state.quotes);
    const {data} = useSelector((state)=>state.bookmarks);

    useEffect(()=>{
        if(quotes.length===0){
            dispatch(fetchQuotes()); //called as a function
        }
    },[])

    //add loading behavior
    return(
        <>
            <div className="grid grid-cols-3 gap-10 justify-center p-4">
                {quotes.map((item,index)=>{
                        return <Card quote={item.quote} author={item.author} key={item.id} id={item.id}/>
                })
                }
            </div>
        </>

    )
}

export default Quotes;