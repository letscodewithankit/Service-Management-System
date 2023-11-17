import React from 'react';
import CustomerAuthUser from './CustomerAuthUser';
import CustomerAfterLogin from './Login/CustomerAfterLogin';
import CustomerBeforeLogin from './Login/CustomerBeforeLogin';


export default function CustomerMain() {
 
  const {getToken}=CustomerAuthUser();

  if(!getToken())
    {
      return <CustomerBeforeLogin/>
    }
    
  return (
    <>
    <CustomerAfterLogin/>
    </>
  )
}
