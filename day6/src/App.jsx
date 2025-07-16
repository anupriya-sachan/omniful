import './App.css'
import { useDispatch } from "react-redux";
import { fetchQuotes } from './pages/Quotes/quoteSlice';
import { useEffect, useState } from "react";
import Quotes from './pages/Quotes';
import Bookmark from './pages/Bookmark'

function App() {
  const [page,setPage] = useState("quotes");
  const dispatch = useDispatch();

  useEffect(()=>{
      dispatch(fetchQuotes()); //called as a function
  },[dispatch])

  return (
    <>
      <nav className='bg-blue-500 text-white p-4 flex justify-center'>
        <button onClick={() => setPage("quotes")} className='mx-2.5'>Quotes</button>
        <button onClick={() => setPage("bookmarks")} className='mx-2.5'>Bookmarks</button>
      </nav>

      <main className='bg-gray-100 min-h-screen w-fit'>
        {page === "quotes" && <Quotes />}
        {page === "bookmarks" && <Bookmark />}
      </main>
    </>
  )
}

export default App
