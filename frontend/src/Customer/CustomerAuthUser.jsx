import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CustomerAuthUser() {
    const navigate=useNavigate();

    const getToken=()=>{
    const tokenString=sessionStorage.getItem('token2');
    const userToken=JSON.parse(tokenString);
    return userToken;
    }

    const getUser=()=>
    {
    const userString=sessionStorage.getItem('user2');
    const userDetail=JSON.parse(userString);
    return userDetail;
    }

    const [token,setToken]=useState(getToken());
    const [user,setUser]=useState(getUser());

    const saveToken=(user,token)=>
    {
        sessionStorage.setItem('token2',JSON.stringify(token));
        sessionStorage.setItem('user2',JSON.stringify(user));

        setToken(token);
        setUser(user);
        navigate('/user');
    }

    const logout=()=>
    {
        sessionStorage.clear();
        navigate('/');
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
