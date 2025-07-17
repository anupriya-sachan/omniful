import './App.css'
import { Outlet, useNavigate } from 'react-router-dom'
function App() {
  const navigate = useNavigate();
  return (
    <>
      <nav className='h-16 bg-purple-500 w-full flex list-none justify-center items-center'>
        <li className='mx-3 text-white cursor-pointer' onClick={()=>navigate('/auditlogs')}>Logs</li>
        <li className='mx-3 text-white cursor-pointer' onClick={()=>navigate('/')}>Users</li>
      </nav>
      <div className='min-h-screen min-w-full bg-white p-6'>
        <Outlet />
      </div>
    </>
  )
}

export default App
