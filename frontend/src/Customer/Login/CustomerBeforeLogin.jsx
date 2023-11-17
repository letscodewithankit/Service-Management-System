import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Main2 from '../Main2'
import SignUp from './SignUp'


export default function CustomerBeforeLogin() {
  return (
    <>
    <Routes>
        <Route path='/' element={<Main2/>}/>
        <Route path='/signup' element={<SignUp/>}/>
    </Routes>
    </>
  )
}
