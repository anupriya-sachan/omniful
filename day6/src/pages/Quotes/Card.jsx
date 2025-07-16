import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBookmark, removeBookmark } from "../Bookmark/bookmarkSlice";

function Card({quote,author,id}){ 
    const dispatch = useDispatch();   
    const {data} = useSelector((state)=>state.bookmarks);
    
    const [bookmarked,setBookmarked] = useState(data.includes(id));

    function handleClick(){
        if(bookmarked){
            dispatch(removeBookmark(id));
            setBookmarked(false);
        }
        else{
            dispatch(addBookmark(id));
            setBookmarked(true);

        }
    }

    return(
        <div className="bg-white p-5 rounded-3xl w-fit">
            <div className="flex justify-between">
                <div className="rounded-xl p-3 bg-gray-800 cursor-pointer" onClick={handleClick}>
                    {bookmarked?<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-white">
                                <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" />
                            </svg>:
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                            </svg>
                    }
                </div>
                <div className="rounded-full p-3 bg-gray-800 cursor-pointer hover:bg-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                    </svg>
                </div>
            </div>
            <p className="py-5 text-black font-semibold text-xl">{quote}</p>
            <p className="font-semibold text-lg py-3 text-gray-500 tracking-wide">{author}</p>
        </div>
    )
}

export default Card;

{/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m3 3 1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 0 1 1.743-1.342 48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664 19.5 19.5" />
</svg> */}

