import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';


export default function ServiceForm(props)
   {
      const [image,setImage]=useState();
      const handleChange=(e)=>
      {
        setImage(e.target.files[0])
      }

   const handleClick=(e)=>
   {
      e.preventDefault();
      if(Object.keys(props.value).length===0)
      {
      const fd=new FormData();
      var input=document.getElementById("service_data").value
      fd.append('title',input)
      fd.append('image',image)
      axios.post("http://127.0.0.1:8000/api/add_data/service",fd).catch((error)=>{
         if(error.status!==200)
         {
            Swal.fire({
               icon: 'error',
               title: 'Oops...',
               text: 'Something went wrong!',
         })
         }
      
      }).then((response)=>{
         console.log(response)
         if(response)
         {
            Swal.fire({
               icon: 'success',
               title: response.data.message,
               showConfirmButton: false,
               timer: 1500
         })
         setTimeout(()=>{window.location.reload()},[1000])
         }
      })
   }
   else
   {
      
      const fd22=new FormData();
      fd22.append('id',props.value.id)
      fd22.append('value',document.getElementById("Upd_data").value)
      axios.post("http://127.0.0.1:8000/api/update_data/service",fd22).catch((error)=>{
         if(error.status!==200)
         {
            Swal.fire({
               icon: 'error',
               title: 'Oops...',
               text: 'Something went wrong!',
         })
         }
      
      }).then((response)=>{
         if(response)
         {
            Swal.fire({
               icon: 'success',
               title: response.data,
               showConfirmButton: false,
               timer: 1500
         })
         setTimeout(()=>{window.location.reload()},[1000])
         }
      })
      
   }
   }
return (
   <>
   <form onSubmit={handleClick}>
   <div className='container'>
   <div className='card'>
   <div className='card-body'>
      <div className='row'>
         <div className='col'>
            {
            Object.keys(props.value).length===0?<><input className='form-control'
               id='service_data' defaultValue=""  name='service_data' placeholder='Enter service name' required/><br/>
               <label htmlFor="image">Upload Image for service</label>
               <input onChange={handleChange} type="file" className="form-control" required/></>
            :<input className='form-control'
            id='Upd_data' defaultValue={props.value.title} name='Upd_data' placeholder='Enter service name'/>
            }
            
         </div>
         </div>
      </div>
      <div className='card-footer'>
         <button type='submit' className='btn btn-primary'>Submit</button>
      </div>
   </div>
   </div>
   </form>
   </>
)
}
