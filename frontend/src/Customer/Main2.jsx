import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'react-clock/dist/Clock.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';
import Swal from 'sweetalert2';
import '../Customer/Customer.css';
import NavbarCustomer2 from './NavbarCustomer2';



export default function Main2() {

  
    
  const [data,setData]=useState([])
  const [data2,setData2]=useState([])
  const [name,setName]=useState("All Services")
 
  
  useEffect(()=>{
    axios.get("http://127.0.0.1:8000/api/service").then(
    (response)=>{
        setData(response.data)
    }
  )
  },[])

  useEffect(()=>
  {
      axios.get("http://127.0.0.1:8000/api/service_details").then(
  (response)=>{
  setData2(response.data)
  }
)
  },[]);

  const handleAlert=()=>
  {
    Swal.fire({
      icon: 'error',
      title: 'You are not logged in',
      text: 'Please Sign In',
  })
  }

  return (
   <>
   <NavbarCustomer2/>
   <div className="container-fluid mt-3">
   <div className="row">
    <div className="col-sm-5" style={{minHeight:"470px"}}>
    <h1>Home Services at <br/> your dorestep?</h1><br/>
    <div className="container p-3 border rounded" >
        <div>
        <h5 style={{fontFamily:"cursive"}}>Select a service </h5>
        <hr className="border-2 border-top border-dark" />
        </div>

        {data.map((response)=>
        <div type="button"  key={response.id} onClick={()=>{setData2(response.get_service_details);setName(response.title)}}
        style={{minWidth:"100px",maxWidth:"100px",maxHeight:"80px !important" ,minHeight:"80px !important" ,position:"relative",display:"inline-block",
        verticalAlign:"middle",marginTop:"1%",marginLeft:"1%",padding:"10px"}}>
          <div className="card-img-top border rounded" style={{backgroundColor:"rgba(245,245,245,1.00)"}}>
          <img style={{minHeight:"70px",maxHeight:"70px"}} src={"http://localhost:8000/uploads/"+response.image} alt='pic'/>
          </div>
        <p style={{fontSize:"12px"}}>{response.title}</p>
        </div>
         )}
    </div>
    </div>
    <div className="col-sm-5">
    <div className="container p-4 border rounded table-wrapper-scroll-y my-custom-scrollbar"  style={{minHeight:"485px"}}>
      <h4 style={{fontFamily:"cursive"}}>{name}</h4><hr></hr><br/>
    {data2.map((res)=>
      <div className="row border p-2 rounded" onClick={()=>handleAlert()}  type="button" key={res.id}>
        <div className="col-sm-7">
        <h4>{res.category}</h4>
       
        <div>
        <img alt='pic'  width={'20px'} src={'../icons/icons8-star-64.png'}/>
        <span style={{fontSize:"12px"}}> 4.80(5.500)</span><br/>
        <span style={{fontSize:"17px",fontWeight:"bold"}}><span>&#8377;</span> {res.price}</span>
        <span style={{fontSize:"14px",marginLeft:"40px",display:"inline-block"}}><li>{res.duration} min</li></span>
        </div>
         <hr style={{borderBottom:"dashed 1px #000000"}}/>
         <p type="button" style={{color:"rgb(110, 66, 229)"}}>View details</p>
        </div>
        <div className="col-sm-4">
        <img className='rounded' alt='pic'  width={'140px'}  src={"http://localhost:8000/uploads/"+res.image} />
        {/* <br/><br/>
        <div style={{textAlign:"center"}}>
        <button type="button" class="btn btn-outline-dark" data-mdb-ripple-color="dark">Add</button>
        </div> */}

        </div>
      </div>
      )}
     
    </div>
    </div>
   </div>
   </div>

   

   </>
  )
}
