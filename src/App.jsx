import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './components/Login.jsx'
import Dashboard from './components/Dashboard.jsx';
import store from './store/store.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

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
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
)
