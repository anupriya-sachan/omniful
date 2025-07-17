import { useEffect } from 'react'
import './App.css'
import Tenants from './features/tenants';

function App() {
  return (
    <>
    <nav className='h-16 bg-purple-500 w-full flex'>
    </nav>
    <div className='min-h-screen min-w-full bg-white'>
          <Tenants/>
    </div>
    </>
  )
}

export default App
