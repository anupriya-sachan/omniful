import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom';
import './App.css'

function App() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <nav className="bg-blue-500 text-white p-4">
        <ul className="flex justify-center space-x-4">
          <li>
            <Link to="/accordion" className="hover:text-gray-300">Accordion</Link>
          </li>
          <li>
            <Link to="/modal" className="hover:text-gray-300">Modal</Link>
          </li>
          <li>
            <Link to="/scroll" className="hover:text-gray-300">Infinite Scroll</Link>
          </li>
          <li>
            <Link to="/search" className="hover:text-gray-300">Search</Link>
          </li>
        </ul>
      </nav>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default App
