import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AccordionPage from './pages/Accordion/index.jsx';
import ImplementModal from './pages/Modal/index.jsx';
import InfiniteScroll from './pages/InfiniteScroll/index.jsx';

const Router = createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/accordion',
    element:<AccordionPage/>
  },{
    path:'/modal',
    element:<ImplementModal/>
  },
  {
    path:'/scroll',
    element:<InfiniteScroll/>
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={Router}>
    <App />
  </RouterProvider>
)
