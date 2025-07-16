import { useSelector } from "react-redux";
import Card from "../Quotes/Card";

function Bookmark(){
    const {data} = useSelector((state)=>state.bookmarks);
    const {quotes,loading} = useSelector((state)=>state.quotes);

    const bookmarked = quotes.filter(item=>data.includes(item.id));
    
    return(
        <>
        <div className="font-extrabold text-gray-800 p-4 text-3xl w-screen">Your Bookmarks!</div>
        <div className="grid grid-cols-3 gap-4 justify-center p-4">
            {bookmarked.map((item,index)=>{
                return <Card quote={item.quote} author={item.author} key={item.id} id={item.id}/>
            })}
        </div>
        </>
    )
}

export default Bookmark;