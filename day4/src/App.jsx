import { useEffect, useState } from 'react'
import './App.css'
import useCounter from '../hooks/useCounter'
import { useDebouncedValue } from '../hooks/useDebounce';
import useFetch from '../hooks/useFetch';
import useLocalStorage from '../hooks/useLocalStorage';
import usePrevious from '../hooks/usePrevious';
import useToggle from '../hooks/useToggle';

function App() {
  const [value,setValue] = useState("");
  const [current,setCurrent] = useState();
  const [mode,setMode] = useToggle(false);

  const [storageValue,setLocalStorage] = useLocalStorage("Store");
  const [count,increment,decrement,reset,setTo] = useCounter();

  const {data,loading,error} = useFetch(`https://jsonplaceholder.typicode.com/todos/1`);

  let debouncedValue = useDebouncedValue(value);
  let previous = usePrevious(current);

  function handleChange(e){
    setValue(e.target.value);
  }

  function handleStorage(e){
    setLocalStorage(e.target.value);
  }

  function handlePrevious(e){
    setCurrent(e.target.value);
  }

  return (
    <>
    <div className='min-h-screen flex items-center justify-center bg-gray-50 p-4 flex-wrap'>
      {/*useCounter*/}
      <div className='border border-gray-200 rounded-xl shadow-sm bg-white p-8 space-y-6 text-center max-w-sm w-full m-4'>
        <h1 className='text-3xl font-extrabold text-gray-800'>useCounter</h1>
        <p className='text-lg text-gray-500 font-medium'>Counter with increment/decrement/reset</p>

        <div className='flex items-center justify-center space-x-6'>
          <button
            onClick={increment}
            className='p-3 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 '
            aria-label="Increment counter"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
            </svg>
          </button>

          <div className='text-3xl font-bold text-gray-900 min-w-[60px]'>
            {count}
          </div>
          <button
            onClick={decrement}
            className='p-3 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 '
            aria-label="Decrement counter"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>
          </button>
        </div>
        <button
          onClick={reset}
          className='mt-6 w-full py-3 px-6 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-semibold focus:outline-none'
        >
          Reset
        </button>
      </div>
      {/*useFetch*/}
      <div className='border border-gray-200 rounded-xl shadow-sm bg-white p-8 space-y-6 text-center max-w-sm w-full m-4'>
        <h1 className='text-3xl font-extrabold text-gray-800'>useFetch</h1>
        <p className='text-lg text-gray-500 font-medium'>Generic data fetching with loading/error states</p>

        <p className='text-lg text-gray-500 font-medium'>data: {data?.title}</p>
        <p className='text-lg text-gray-500 font-medium'>loading:{loading?"true":"false"}</p>
        <p className='text-lg text-gray-500 font-medium'>Error: {error}</p>
      </div>
      {/*useLocalStorage*/}
      <div className='border border-gray-200 rounded-xl shadow-sm bg-white p-8 space-y-6 text-center max-w-sm w-full m-4'>
        <h1 className='text-3xl font-extrabold text-gray-800'>useLocalStorage</h1>
        <p className='text-lg text-gray-500 font-medium'>Persist state to localStorage</p>

        <p>Storage has : {storageValue}</p>
        <input type="text" className='p-2 focus:outline-none focus:border-b-2 focus:border-blue-600 ' placeholder='Enter some text' onChange={(e)=>{handleStorage(e)}}></input>
      </div>
      {/*useDebounce*/}
      <div className='border border-gray-200 rounded-xl shadow-sm bg-white p-8 space-y-6 text-center max-w-sm w-full m-4'>
        <h1 className='text-3xl font-extrabold text-gray-800'>useDebounce</h1>
        <p className='text-lg text-gray-500 font-medium'>Debounce any value changes</p>

        <input type="text" className='p-2 focus:outline-none focus:border-b-2 focus:border-blue-600 ' placeholder='Enter some text' onChange={(e)=>{handleChange(e)}}></input>
        <p className='py-3 px-6 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-semibold'>Debounced value:{debouncedValue}</p>

      </div>
      {/*usePrevious*/}
      <div className='border border-gray-200 rounded-xl shadow-sm bg-white p-8 space-y-6 text-center max-w-sm w-full m-4'>
        <h1 className='text-3xl font-extrabold text-gray-800'>usePrevious</h1>
        <p className='text-lg text-gray-500 font-medium'>Track previous value of any state</p>

        <input type="text" className='p-2 focus:outline-none focus:border-b-2 focus:border-blue-600 ' placeholder='Enter some text' onChange={(e)=>{handlePrevious(e)}}></input>
        <p className='py-3 px-6 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-semibold'>Previous value:{previous}</p>
      </div>

      {/*useToggle*/}
      <div className='border border-gray-200 rounded-xl shadow-sm bg-white p-8 space-y-6 text-center max-w-sm w-full m-4 flex flex-col justify-center'>
        <h1 className='text-3xl font-extrabold text-gray-800'>useToggle</h1>
        <p className='text-lg text-gray-500 font-medium'>Boolean state with toggle functionality</p>

        <div className='mx-auto'>
            {mode ?
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
          </svg> :
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
          </svg> }
        </div>
        <button
          onClick={()=>{setMode()}}
          className='mt-6 w-full py-3 px-6 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-semibold focus:outline-none'
        >
          Switch!
        </button>
      </div>
    </div>
    </>
  )
}

export default App
