import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Navbar from '../Navbar';
import '../Service.css';
import ServiceForm from './ServiceForm';
import Table from './Table';

export default function AddData() {

  
    
  const [formData,setFormData]=useState([])
  const [data,setData]=useState([])
  const [image,setImage]=useState()
  const [edit,setEdit]=useState({})
  const [name,setName]=useState("Add Service")
  var a=1;
  const [checker,setChecker]=useState(0)

  useEffect(()=>{
  axios.get("http://127.0.0.1:8000/api/service").then(
    (response)=>{
        setFormData(response.data)
    }
  )
  },[]);

  useEffect(()=>
  {
      axios.get("http://127.0.0.1:8000/api/service_details").then(
  (response)=>{
  setData(response.data)
  }
)
  },[checker]);

  const handleChange=(e)=>
  {
    setImage(e.target.files[0])
  }

  const handleSubmit= async (e)=>{
    e.preventDefault();
    const fd= new FormData();
    fd.append('service_id',document.getElementById("service").value)
    fd.append('category',document.getElementById("category").value)
    fd.append('price',document.getElementById("price").value)
    fd.append('duration',document.getElementById("duration").value)
    fd.append('image_file',image)

        await axios.post("http://127.0.0.1:8000/api/add_data/service_details",fd).catch(
        (error)=>{
            if(error)
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
                    title: response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            a=checker+1;
            setChecker(a);
            document.getElementById("myForm").reset();
          })
        }
      const  handleDeleteItem=(id)=>
      {
        Swal.fire({
          title: 'Are you sure want to delete Service data?',
          text: "If you delete service data, then their service details data will also deleted",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => 
        {
        if (result.isConfirmed)
        {
        
        const dataUrl="http://127.0.0.1:8000/api/delete_data/service";
        const fd=new FormData();
        fd.append('id',id);
        axios.post(dataUrl,fd).then((res)=>{
        Swal.fire({
          icon: 'success',
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500
      })
      setTimeout(()=>{window.location.reload()},[1000])
    })
      .catch(
        (error)=>{
            if(error)
            {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            }
        })


      }
    })
        
      }
      
return (
    <>
    <Navbar/>
    <div className='container-fluid '>
    <div className='row pt-3 border'>
    <div className='col-sm-5'>
    
    <div className='card' style={{height:"480px"}}>
    <div className='card-header' style={{display:"flex"}}>
    <h5 style={{fontFamily:'sans-serif'}}>Add service details</h5>
    <div style={{marginLeft:"40%"}}>
    <button onClick={()=>{setEdit({});setName("Add Service")}} className='btn' data-bs-toggle="modal" data-bs-target="#myModal"><img alt='pic'  width={'20px'} src={'../icons/add_1237946.png'}/></button>
    <button  className='btn' data-bs-toggle="modal" data-bs-target="#myModal2"><img alt='pic'  width={'20px'} src={'../icons/preview_2356572.png'}/></button>
    </div>
    </div>
    <div className='card-body'>
    <>
    <div className='container'>
    <form id='myForm' onSubmit={handleSubmit}>
    <div className="row">
        <div className="col">
            <select name='service' id='service'  className='form-select' required>
              <option selected="" disabled>----Select a service----</option>
            {formData.map((response)=>
            <option key={response.id} value={response.id}>{response.title}</option>
            )}
            </select>
            </div>
    </div>
    <br/>
    <div className="row">
        <div className="col">
            <input type="text" id='category' name='category' className="form-control" placeholder='Enter category' required/>
        </div>
    </div>
    <br/>
    <div className="row">
        <div className="col">
        <input type="number" id='price' name='price' className="form-control" placeholder='Enter price' required/>
        </div>

    </div>
    <br/>
    <div className="row">
        <div className="col">
        <input type="text" id='duration' name='duration' className="form-control" placeholder='Enter duration' required/>
        </div>

    </div>
    <br/>
    <div className="row">
        <div className="col">
            <label htmlFor="image">Upload Image for category</label>
        <input onChange={handleChange} type="file" className="form-control" required/>
        </div>
    </div>
    <br/>
    <div className="row">
        <input type="submit" className="btn btn-primary" />
    </div>
    </form>
  
    </div>
    </>
    
    </div>
    </div>
    </div>
    <div className='col'>
    <div style={{height:"480px"}} className='card'>
    <div className='card-header'>
    <h5 style={{fontFamily:'sans-serif'}}>Service Details Table</h5>
    </div>
    <div className='card-body'>
    <Table value={data}/>
    </div>
    </div>
    </div>
    </div>
    </div>

    <>
  {/* The Modal */}
  <div className="modal" id="myModal">
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        {/* Modal Header */}
        <div className="modal-header">
          <h4 className="modal-title">{name}</h4>
          <button type="button" className="btn-close" data-bs-dismiss="modal" />
        </div>
        {/* Modal body */}
        <div className="modal-body">
            <ServiceForm value={edit}/>
        </div>
        {/* Modal footer */}
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-danger"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</>


<>
  {/* The Modal */}
  <div className="modal" id="myModal2">
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        {/* Modal Header */}
        <div className="modal-header">
          <h4 className="modal-title">Service Table</h4>
          <button type="button" className="btn-close" data-bs-dismiss="modal" />
        </div>
        {/* Modal body */}
        <div className="modal-body">
        <div className="table-wrapper-scroll-y my-custom-scrollbar">
            <table className='table table-striped table-responsive'>
            <thead style={{position:"sticky"}}>
              <tr>
                <th>id</th>
                <th>Icon</th>
                <th>Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                formData.map((data)=>
                <tr key={data.id}>
                <td >{data.id}</td>
                <td><img style={{height:50,width:60}} src={"http://localhost:8000/uploads/"+data.image} alt="pic"/></td>
                <td>{data.title}</td>
                <td><img alt='pic' type="button"  data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#myModal" onClick={()=>{setEdit(data);setName("Edit Service name")}}
                 width={'30px'} src={'../icons/edit_1827933.png'}/>
                <img alt='pic' type="button" onClick={()=>{handleDeleteItem(data.id)}} width={'35px'} src={'../icons/352303_delete_icon.png'}/>
                </td>
                </tr>
                )
              }
            </tbody>
            </table>
            </div>
        </div>
        {/* Modal footer */}
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-danger"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</>


    </>
  )
}
