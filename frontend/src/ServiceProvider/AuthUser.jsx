import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthUser() {
    const navigate=useNavigate();

    const getToken=()=>{
    const tokenString=sessionStorage.getItem('token');
    const userToken=JSON.parse(tokenString);
    return userToken;
    }

    const getUser=()=>
    {
    const userString=sessionStorage.getItem('user');
    const userDetail=JSON.parse(userString);
    return userDetail;
    }

    const [token,setToken]=useState(getToken());
    const [user,setUser]=useState(getUser());

    const saveToken=(user,token)=>
    {
        sessionStorage.setItem('token',JSON.stringify(token));
        sessionStorage.setItem('user',JSON.stringify(user));

        setToken(token);
        setUser(user);
        navigate('/service/dashboard');
    }

    const logout=()=>
    {
        sessionStorage.clear();
        navigate('/service/login');
    }
    

    return(
    {
        setToken:saveToken,
        user,
        logout,
        getToken,
        token,
    }
    )
  
}
