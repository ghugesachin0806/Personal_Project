import React from 'react'
import {Routes, Route, Navigate } from 'react-router-dom';
import LoginComponent from '../components/Login/LoginComponent';
import SignUpComponent from '../components/SignUp/SignUpComponent';


const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Navigate to='/signin' replace/>}/>
        <Route path='/signin' element={<LoginComponent/>}/>
        <Route path='/signup' element={<SignUpComponent/>}/>
    </Routes>
  )
}

export default AppRoutes