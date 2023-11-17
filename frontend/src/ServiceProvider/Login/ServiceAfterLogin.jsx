import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddData from '../Add/AddData';
import Order from '../Add/Order';

export default function ServiceAfterLogin() {
  return (
    <>
    <Routes>
    <Route path='/service/dashboard' element={<AddData/>}/>
    <Route path='/service/order' element={<Order/>}/>
    </Routes>
    </>
  )
}
