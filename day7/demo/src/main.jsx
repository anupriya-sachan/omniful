import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store.js'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { createBrowserRouter, RouterProvider } from 'react-router'
import LogIn from './features/auth/index.jsx'
import Dashboard from './features/dashboard/index.jsx'
import WithRoleMultiPageForm from './features/createOrderForm/WithRoleMultiPageForm.jsx'
import AuditLogPage from './features/audits/Audit.jsx'

const queryClient = new QueryClient();

const routes = createBrowserRouter([
  {
      path:'/login',
      element:<LogIn/>
  },
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/dashboard',
        element:<Dashboard/>
      },
      {
        path:'/create',
        element:<WithRoleMultiPageForm/>
      },
      {
        path:'/orders/:orderId',
        element:<WithRoleMultiPageForm/>
      },
      {
        path:'/audits',
        element:<AuditLogPage/>
      }
    ]
  },
])

createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={routes}>
          <App />
        </RouterProvider>
      </Provider>
    </QueryClientProvider>
)
