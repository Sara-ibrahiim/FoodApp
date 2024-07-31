import React from 'react'
import logo from "../../../../images/logo.png"
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
let password;
export default function ResetPass() {

  let navigate = useNavigate();
  let{
    register,
    handleSubmit,
    watch,
    getValues,
    formState:{errors}
  } = useForm(); 
  
  password = watch("password", "");
  let onSubmit = async (data)=>{
    try{
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset",data
        
      )
      toast.success("Password Changed")
      console.log(response)
      navigate("/")
    } catch(error){
      toast.error(error.response.data.message);
      console.log(error.response.data.message)
    }
  };
  return <>
  <div className="auth-container montserrat">
    <div className="container-fluid bg-overlay">
      <div className="row vh-100 justify-content-center align-items-center">
        <div className="col-md-5 bg-white py-3 px-5 text-center rounded rounded-2  ">
          <div className=''>
            <img src={logo} alt="food-logo"  className='w-50 pt-3'/>
            <div className="text-start mt-3 mb-4">
              <h5 className='mb-1 header-text '>Reset Password </h5>
              <p className='text-logo'>Please Enter Your Otp or Check Your Inbox</p>
  


</div>
            <form onSubmit={handleSubmit(onSubmit)}>
              {errors.email && <p className='text-danger'>{errors.email.message}</p>}
            <div className="input-group pb-3">
  <span className="input-group-text" id="basic-addon1"><i className='fa-regular fa-envelope icon-color'></i></span>
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
{errors.seed && <p className='text-danger'>{errors.seed.message}</p>}
<div className="input-group pb-3">
  <span className="input-group-text" id="basic-addon1"><i className='fa-solid fa-lock icon-color'></i></span>
  <input type="text" className="form-control" placeholder="OTP"
   aria-label="seed" aria-describedby="basic-addon1"
  {...register('seed',{
    required:"OTP is required",
    minLength: {
      value: 4,
      message: "OTP must have at least 4 characters"
    }
   
  })} />
</div>
{errors.password && <p className='text-danger'>{errors.password.message}</p>}
<div className="input-group pb-3">
  <span className="input-group-text" id="basic-addon1"><i className='fa-solid fa-lock icon-color'></i></span>
  <input type="password" className="form-control" placeholder="Password"
   aria-label="password" aria-describedby="basic-addon1"
  {...register('password',{
    required:"password is required",
    pattern:{
      value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[{\]};:'",/?]).{8,}$/,
      message:"password  should be vaild password "

    },
  })} />
</div>
{errors.confirmPassword && <p className='text-danger'>{errors.confirmPassword.message}</p>}
<div className="input-group pb-3">
  <span className="input-group-text" id="basic-addon1"><i className='fa-solid fa-lock icon-color'></i></span>
  <input type="password" className="form-control" placeholder="Confirm New Password"
   aria-label="confirmPassword" aria-describedby="basic-addon1"
   {...register('confirmPassword',{
    required:"ConfirmPassword is required",
    validate: (value) => value === watch("password") || "Passwords do not match"
  })} />
</div>


<button className='btn btn-success d-block w-100 my-2'>Reset Password</button>


            </form>

          </div>
        </div>
      </div>
    </div>
  </div>
    </>
}
