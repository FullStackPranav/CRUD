import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css';
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserDash from './components/Admin/userdashboard.jsx';

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userdashboard" element={<UserDash/>} />

      </Routes>
    </BrowserRouter></StrictMode>,
)
