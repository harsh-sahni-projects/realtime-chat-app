import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './components/Login.jsx'
import Dashboard from './components/Dashboard.jsx';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login/>
  },
  {
    path: '/dashboard',
    element: <Dashboard/>
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
