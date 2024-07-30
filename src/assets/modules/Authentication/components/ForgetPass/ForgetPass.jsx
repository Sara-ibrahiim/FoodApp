import React from 'react'
import logo from "../../../../images/logo.png"
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ForgetPass() {
  let navigate = useNavigate();
  let{
    register,
    handleSubmit,
    formState:{errors}
  } = useForm(); 
  let onSubmit = async (data)=>{
    try{
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request",data
        
      )
      toast.success("OTP Sended successfully")
      console.log(response)
      navigate("/ResetPassword")
    } catch(error){
      toast.error(error.response.data.message);
      console.log(error.response.data.message)
    }
  };
  return <>
  <div className="auth-container">
    <div className="container-fluid bg-overlay">
      <div className="row vh-100 justify-content-center align-items-center">
        <div className="col-md-5 bg-white py-3 px-5 text-center rounded rounded-2  ">
          <div className=''>
            <img src={logo} alt="food-logo"  className='w-50 pt-4'/>
            <div className="text-start mt-3 mb-5">
              <h5 className='mb-1 header-text '>Forget Your Password?</h5>
              <p className='text-logo'>No worries! Please enter your email and we will send a password reset link </p>
  


</div>
            <form onSubmit={handleSubmit(onSubmit)}>
              {errors.email && <p className='text-danger'>{errors.email.message}</p>}
            <div className="input-group pb-4">
  <span className="input-group-text" id="basic-addon1"><i className='fa-solid fa-mobile-screen icon-color'></i></span>
  <input type="email" className="form-control" placeholder="Enter Your Email" aria-label="email" 
  aria-describedby="basic-addon1"
  {...register('email',{
    required:"Email is required",
    pattern:{
      value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message:"Email should be vaild mail"

    },
  })}/>
</div>



<button className='btn btn-success d-block w-100 my-5'>Submit</button>


            </form>

          </div>
        </div>
      </div>
    </div>
  </div>
    </>
}
