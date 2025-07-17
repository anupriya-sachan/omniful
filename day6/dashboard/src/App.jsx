import { useState } from 'react'
import './App.css'
import Products from './features/products/Index'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <nav className='h-16 bg-purple-500 w-full'>

    </nav>
    <div className='min-h-screen min-w-full bg-white'>
          <Products/>
    </div>

     
    </>
  )
}

export default App
