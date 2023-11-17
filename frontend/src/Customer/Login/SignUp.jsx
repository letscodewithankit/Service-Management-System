import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import CustomerAuthUser from '../CustomerAuthUser';

export default function SignUp() {

  const {setToken}=CustomerAuthUser();
    let [authMode, setAuthMode] = useState("signin")

    const changeAuthMode = () => {
      setAuthMode(authMode === "signin" ? "signup" : "signin")
    }

    const handleSignup=(e)=>
    {
      e.preventDefault();
       axios.post('http://127.0.0.1:8000/api/customer/store',
      {name:e.target[0].value,email:e.target[1].value,password:e.target[2].value}).then
      ((response)=>{
        if(response.status===200)
        {
          Swal.fire({
            icon: 'success',
            title: response.data.message,
            text: 'Please Sign In',
        })
        changeAuthMode()
        }
      }).catch((error)=>{
        if(error)
        {
          Swal.fire({
            icon: 'success',
            title: 'Something Went Wrong',
            text: 'Please try again ',
          })
        }
      })
      
    }

    const handleError=(err)=>
    {
      Swal.fire({
            icon: 'error',
            title: "Unathorized, If don't have account please signup",
            showConfirmButton: false,
            timer: 1500
          })
    }
    const handleSubmit=(e)=>
    {
    e.preventDefault()
    if(e.target[0].value!==null&&e.target[1].value!==null)
    {
      axios.post('http://127.0.0.1:8000/api/customer/login',
      {email:e.target[0].value,password:e.target[1].value}).then
      ((response)=>
      response.status==="error"?handleError(response.message):setToken(response.data.user,response.data.authorization.token)      
      ).catch((error)=>
      {
        if(error)
        {
           handleError(error.message)
        }
      })
    }
    }
  
    if (authMode === "signin") {
      return (
        <div className="Auth-form-container" style={{height:"571px",backgroundImage:`url(../image/10.jpg)`,backgroundSize:"900px"}}>
          <form className="Auth-form" onSubmit={(e)=>{handleSubmit(e)}}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign In</h3>
              <div className="text-center">
                Not registered yet?{" "}
                <span type="button" className="link-primary" onClick={changeAuthMode}>
                  Sign Up
                </span>
              </div>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                  required
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  required
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      )
    }
  
    return (
      <div className="Auth-form-container" style={{height:"571px",backgroundImage:`url(../image/10.jpg)`,backgroundSize:"900px"}}>
        <form className="Auth-form" onSubmit={(e)=>{handleSignup(e)}}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
            <div className="text-center">
              Already registered?{" "}
              <span type="button" className="link-primary" onClick={changeAuthMode}>
                Sign In
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Full Name</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="e.g Ankit Gupta"
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Email Address"
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Password"
                required
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    )
}
