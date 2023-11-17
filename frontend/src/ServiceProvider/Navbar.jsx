import React from 'react';
import AuthUser from './AuthUser';

export default function Navbar() {
    const {logout}=AuthUser();
    const handleLogout=()=>
    {
    logout();
    }
    return (
      <>
      <nav className="navbar navbar-expand-sm bg-light ">
      <div className="container-fluid">
      {/* Links */}
      <ul className="navbar-nav">
      <li className="nav-item">
        <a className="nav-link" style={{color:"black"}}  href="http://localhost:3000/service/dashboard">
          Add
          </a>
          </li>
          <li className="nav-item">
          <a className="nav-link" style={{color:"black"}} href="http://localhost:3000/service/order">
         Order
          </a>
          
      </li>
      </ul>
      <ul className='nav navbar-nav navbar-right'>
      <li className='nav-item' >
        <button onClick={()=>{handleLogout()}} className='btn btn-light'>Logout</button>
      </li>
      </ul>
    
  </div>
  </nav>
  
      </>
    )
}
