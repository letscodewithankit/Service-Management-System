import React from 'react';
import AuthUser from './AuthUser';
import ServiceAfterLogin from './Login/ServiceAfterLogin';
import ServiceBeforeLogin from './Login/ServiceBeforeLogin';

export default function ServiceProvider() {
    const {getToken}=AuthUser();
    if(!getToken())
    {
      return <ServiceBeforeLogin/>
    }
  return (
    <>
    <ServiceAfterLogin/>
    </>
  )
}
