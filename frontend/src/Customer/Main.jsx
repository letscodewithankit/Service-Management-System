import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'react-clock/dist/Clock.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import 'react-time-picker/dist/TimePicker.css';
import Swal from 'sweetalert2';
import '../Customer/Customer.css';
import CustomerAuthUser from './CustomerAuthUser';
import NavbarCustomer from './NavbarCustomer';




export default function Main() {

  const navigate=useNavigate();
  
  const [data,setData]=useState([])
  const [data2,setData2]=useState([])
  const [name,setName]=useState("All Services")
  const [date, setDate] = useState();
  const [modaldata,setModalData]=useState([])
  const [time,setTime]=useState([])
  const {user}=CustomerAuthUser();
  

  useEffect(()=>{
    axios.get("http://127.0.0.1:8000/api/get_data/time").then(
    (response)=>{
        setTime(response.data)
    }
  )
  },[])


  
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

  const handleSubmit=(e)=>
  {
    e.preventDefault();
    var time_id=e.target[1].value;
   var fulldate=date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();
    axios.post('http://127.0.0.1:8000/api/add_data/appointment',{time_id:time_id,data:modaldata,date:fulldate,customer_id:user[0].id}
    ).catch(
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
            navigate('/user/booking')
              Swal.fire({
                  icon: 'success',
                  title: response.data.message,
                  showConfirmButton: false,
                  timer: 1500
              })
          }
        })
      
  }

  return (
   <>
   <NavbarCustomer/>
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
      <div className="row border p-2 rounded" onClick={()=>{setModalData(res)}}  type="button" data-bs-toggle="modal" data-bs-target="#myModal2" key={res.id}>
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

   <>
  {/* The Modal */}
  <div className="modal" id="myModal2">
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        {/* Modal Header */}
        <div className="modal-header bg-info">
          <h4 className="modal-title">Book Appointment</h4>
          <button type="button" className="btn-close" data-bs-dismiss="modal" />
        </div>
        {/* Modal body */}
        <div className="modal-body">
        
          <div className="card">
            <form onSubmit={(e)=>{handleSubmit(e)}}>
          <div className="container p-3">
          <h4>Select Date & Time</h4>
            <hr></hr>
            
            <div className="row">
              <div className="col-sm-4">
              <p>Service Name :</p>
              </div>
              <div className="col-sm-7">
              <h3>{modaldata.category}</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
              <p>Price & Duration :</p>
              </div>
              <div className="col-sm-7">
              <span style={{fontSize:"17px",fontWeight:"bold"}}><span>&#8377;</span>{modaldata.price}</span>
              <span style={{fontSize:"14px",marginLeft:"40px",display:"inline-block"}}><li>{modaldata.duration} min</li></span>
            </div>
            </div>
            <div className="row">
            <div className='col-sm-4'>
              <p>Select Date :</p>
            </div>
            <div className="col-sm-7">
            <DatePicker format="MM-dd-y" className="form-control" selected={date} onChange={(date) => setDate(date)} required />
            </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
              <p>Select Time :</p>
              </div>
              <div className="col-sm-4">
              <select className='form-control' required>
                <option selected disabled  >---Select Time----</option>
                {time.map((res)=>
                <option key={res.id} id='time' value={res.id} required>{res.time}  {res.zone}</option>
                )}
                
              </select>
              </div>
            </div>
            <div className="card-footer">
              <div className="row">
              <button type='submit' className='btn btn-info'>Book Appointment</button>

              </div>
            </div>
            </div>
          </form>
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
