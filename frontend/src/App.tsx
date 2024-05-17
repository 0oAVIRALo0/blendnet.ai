import { BrowserRouter as Router,Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/Signup"
import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import  { useState, useEffect } from 'react';

import { useStateContext } from './contexts/ContextProvider';

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import CircularProgress from '@mui/material/CircularProgress';

import React from "react";
import Home from "./components/Home";
import Search from "./components/Search";

// const logout = () => {
//   localStorage.clear()
//   return <Navigate to="/login" />
// }

// const RegisterAndLogout = () => {
//   localStorage.clear()
//   return <SignUp />
// }

const App: React.FC = () => {
  const { isLoggedIn,activeMenu } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 500);
  }, []);

  if (!isLoading) {
    return(
      <div className="flex justify-center items-center h-screen">
        <CircularProgress color="inherit"/>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/error" element={<NotFound />} />

      </Routes>
    );
  } else {
    return (
      <div className='flex relative'>
  
        <div className={`${
          activeMenu 
            ? "w-72 fixed sidebar bg-blue-100 transition-all duration-300 ease-in-out"
            : "w-0 transition-all duration-200 ease-in-out"
        }`}>
          <Sidebar/>
        </div>
  
        <div className={
          activeMenu
            ? "bg-main-bg min-h-screen md:ml-72 w-full"
            : "bg-main-bg w-full min-h-screen flex-2 "
        }>
          <div className='fixed md:static bg-blue-100 navbar w-full'>
            <Navbar/>
          </div>
  
          <div>
            <Routes>
              <Route path="/dashboard" element={<ProtectedRoute>
                <Dashboard/>
              </ProtectedRoute>} />
  
              <Route path="/home" element={<ProtectedRoute>
                <Home/>
              </ProtectedRoute>} />

              <Route path="/watchlist" element={<ProtectedRoute>
                <Search/>
              </ProtectedRoute>} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
  
        </div>
      </div>
    )
  }
}

export default App