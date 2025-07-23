import './App.css'
import { Outlet, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { Link } from 'react-router';

function App() {
  const user = useSelector((state)=>state.auth);
  const navigate = useNavigate();

  return (
    <>
      {user?.role ? <div className='min-h-screen w-full'>
        <nav className='bg-gray-700 text-white px-6 py-4 flex justify-between items-center shadow'>
          <div className="flex gap-6 items-center">
          <Link
            to="/"
            className="hover:text-gray-300 transition duration-150"
          >
            Dashboard
          </Link>

          {user?.role === 'admin' && (
            <Link
              to="/audits"
              className="hover:text-gray-300 transition duration-150"
            >
              Logs
            </Link>
          )}
        </div>
        <div>
          <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() =>{localStorage.clear();
                navigate('/login')
              }}
            >
              Log out
            </button>
        </div>
        </nav>
          <Outlet/>
      </div> :
        <p>Log In First</p>
      }
   </>
    
  )
}

export default App
