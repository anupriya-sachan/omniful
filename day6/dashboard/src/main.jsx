import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store, { persistor } from './store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Products from './features/products/Index.jsx'
import AuditLogs from './features/logs/index.jsx'
import Tenants from './features/tenants/index.jsx'

const routes = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Tenants/>
      },
      {
        path:'/products/:userId',
        element:<Products/>
      },
      {
        path:'/auditlogs',
        element:<AuditLogs/>
      }
    ]
  },
  
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <RouterProvider router={routes}>
            <App />
      </RouterProvider>
    </PersistGate>
  </Provider>
)
