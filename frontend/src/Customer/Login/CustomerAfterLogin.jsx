import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Booking from '../Booking'
import Main from '../Main'


export default function CustomerAfterLogin() {
  return (
    <>
     <Routes>
        <Route path='/user' element={<Main/>}/>
        <Route path='/user/booking' element={<Booking/>}/>
    </Routes>
    </>
  )
}
