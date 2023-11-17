import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';
import AuthUser from '../AuthUser';

export default function Login() {

  const {setToken}=AuthUser();
  const handleSubmit=(e)=>
  {
    const handleError=(err)=>
    {
      Swal.fire({
            icon: 'error',
            title: err,
            showConfirmButton: false,
            timer: 1500
          })
    }
    e.preventDefault();
    if(e.target[0].value!==null&&e.target[1].value!==null)
    {
      axios.post('http://127.0.0.1:8000/api/service_login',
      {email:e.target[0].value,password:e.target[1].value}).then
      ((response)=>
      response.status==="error"?handleError(response.message):setToken(response.data.user,response.data.authorization.token)      
      )
    }
    
  }
  return (
    <>
    <div  style={{height:"571px",backgroundImage:`url(../image/1.jpg)`,backgroundSize:"900px"}}>
  <div  className="container p-4 ">
    <div className="row d-flex justify-content-center align-items-center ">
      <div className="col col-xl-10">
        <div className="card" style={{ borderRadius: "1rem" }}>
          <div className="row g-0">
            <div  className="col-md-6 col-lg-5 d-none d-md-block">
              <img
                src={'../image/4.jpg'}
                alt="login form"
                className="img-fluid"
                style={{ borderRadius: "1rem 0 0 1rem",height:"500px"}}
              />
            </div>
            <div  className="col d-flex align-items-center">
              <div className="card-body p-2 p-lg-5 text-black">
                <form onSubmit={(e)=>{handleSubmit(e)}}>
                  <h3
                    className="fw-normal mb-3 pb-3"
                    style={{ letterSpacing: 1,fontFamily:"cursive" }}
                  >
                    Service Provider Login
                  </h3>
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="form2Example17"
                      className="form-control form-control-lg"
                      placeholder='Enter email'
                      required
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="form2Example27"
                      className="form-control form-control-lg"
                      placeholder='Enter password'
                      required
                    />
                  </div>
                  <div className="pt-1 mb-4">
                    <button
                      className="btn btn-dark btn-lg btn-block"
                      type="submit"
                    >
                      Login
                    </button>
                  </div>
                
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
    </>
  )
}
