import Card from "./Card"
import { useSelector } from "react-redux";

function Quotes(){
    const {quotes,loading} = useSelector((state)=>state.quotes);

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