import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';

export default function ServiceBeforeLogin() {
  return (
    <>
    <Routes>
    <Route path='/service/login' element={<Login/>}/>
    </Routes>
    </>
  )
}
