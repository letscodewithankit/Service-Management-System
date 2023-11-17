import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../Service.css';




export default function Table(props) {
    const [data,setData]=useState({})
    var count=1;

    const handleSubmit=async(e)=>
    {
        e.preventDefault();
        const fd=new FormData();
        fd.append('id',data.id)
        fd.append('category',e.target[0].value)
        fd.append('price',e.target[1].value)
        fd.append('duration',e.target[2].value)
        await axios.post('http://127.0.0.1:8000/api/update_data/service_details',fd)
        .then((res)=>{
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

    const handleDelete=(id)=>
    {
        Swal.fire({
            title: 'Are you sure want to delete service_details data?',
            text: "Once you delete it will not retrieved!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed)
            {
        const fd=new FormData()
        fd.append('id',id)
        axios.post('http://127.0.0.1:8000/api/delete_data/service_details',fd)
        .then((res)=>{
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
    <div className="table-wrapper-scroll-y my-custom-scrollbar-2">
    <table className="table table-sm">
    <thead style={{position:"sticky"}}>
        <tr>
        <th>Sno.</th>
        <th>Image</th>
        <th>Service</th>
        <th>Category</th>
        <th>Price</th>
        <th>Duration</th>
        <th>Action</th>
        </tr>
    </thead>
    <tbody>
        {props.value.map((response)=>
        <tr key={response.id}>
        <td>{count++}</td>
        <td><img style={{height:50,width:60}} src={"http://localhost:8000/uploads/"+response.image} alt="pic"/></td>
        <td>{response.get_service_data.title}</td>
        <td>{response.category}</td>
        <td>{response.price}</td>
        <td>{response.duration}</td>
        <td ><img alt='pic' type="button" onClick={()=>{setData(response)}}  data-bs-toggle="modal" data-bs-target="#myModal3" width={'30px'} src={'../icons/edit_1827933.png'}/>
        <img alt='pic' type="button" onClick={()=>{handleDelete(response.id)}} width={'35px'} src={'../icons/352303_delete_icon.png'}/></td>
        
        </tr>
        )}
    </tbody>
    </table>
    </div>

    <>
  {/* The Modal */}
    <div className="modal" id="myModal3">
    <div className="modal-dialog modal-lg">
    <div className="modal-content">
        {/* Modal Header */}
        <div className="modal-header">
        
        <button type="button" className="btn-close" data-bs-dismiss="modal" />
        </div>
        {/* Modal body */}
        <div className="modal-body">
            <form onSubmit={(e)=>{handleSubmit(e)}}>

            <div className="card">
                <div className="card-header">
                    <p>Edit Service details Data</p>
                </div>
                <div className="card-body">
                <div className="row">
        <div className="col">
            <input type="text" id='category' defaultValue={data.category} name='category' className="form-control" placeholder='Enter category' required/>
        </div>
    </div>
    <br/>
    <div className="row">
        <div className="col">
        <input type="number" id='price' name='price' defaultValue={data.price} className="form-control" placeholder='Enter price' required/>
        </div>

    </div>
    <br/>
    <div className="row">
        <div className="col">
        <input type="text" id='duration' name='duration' defaultValue={data.duration} className="form-control" placeholder='Enter duration' required/>
        </div>

    </div>
    <br/>
    <div className="row">
        <input type="submit" className="btn btn-primary" />
    </div>
    </div>
    </div>
    </form>
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
