import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/auth/auth.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
    
  <BrowserRouter>
  <AuthProvider>
  <ToastContainer />
      <App />
  </AuthProvider>
   
  </BrowserRouter>

)
