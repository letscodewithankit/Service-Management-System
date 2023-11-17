import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavbarCustomer from './NavbarCustomer';

export default function Booking() {
  const [data,setData]=useState([]);
  
  
 

    useEffect(()=>{
      const u=JSON.parse(sessionStorage.getItem('user2'))
        axios.post("http://127.0.0.1:8000/api/get_data/customer/appointment",{id:u[0].id}).then(
          (response)=>{
              setData(response.data)
          }
        )
        },[]);
  return (
    <>
   <NavbarCustomer/>
    <div className="container mt-3">
        <div className="card">
           <div className="card-header">
            <h5 style={{fontFamily:"cursive",textAlign:"center"}}>Orders Table</h5>
           </div>
           <card className="body">
           <table class="table table-light">
           <thead>
                <tr>
                 <th scope="col">Order_id</th>
                 <th scope="col">Customer_id</th>
                 <th scope="col">Service details id</th>
                 <th scope="col">Time</th>
                 <th scope="col">Date</th>
                 <th scope="col">Date of booking & time</th>
                </tr>
            </thead>
            <tbody>
                {data.map((res)=>
               <tr>
               <th scope="row">{res.id}</th>
               <td>{res.customer_id}</td>
               <td>{res.ser_details_id}</td>
               <td>{res.time_id}</td>
               <td>{res.date}</td>
               <td>{res.created_at}</td>
               </tr>
               )}
               </tbody>
           </table>
           </card>
        </div>
    </div>
    </>
  )
}
