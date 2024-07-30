import React from 'react'
import logo from "../../../../images/logo.png"
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Login() {
  let navigate = useNavigate();
  let{
    register,
    handleSubmit,
    formState:{errors}
  } = useForm(); 
  let onSubmit = async (data)=>{
    try{
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Login",data
        
      )
      toast.success("Login successfully")
      console.log(response)
      navigate("/dashboard")
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
            <div className="text-start mt-3 pb-3">
              <h5 className='mb-1 header-text '>Login</h5>
              <p className='text-logo'>Welcome Back! Please enter your details </p>
  


</div>

            <form onSubmit={handleSubmit(onSubmit)}>
              {errors.email && <p className='text-danger'>{errors.email.message}</p>}
            <div className="input-group ">
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
{errors.password && <p className='text-danger'>{errors.password.message}</p>}
<div className="input-group mb-1 mt-4">
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
<div className="links d-flex justify-content-between pb-3">
            <Link className='text-dark text-decoration-none' to="forgetpassword">Forget Password?</Link>
              <Link className='text-success text-decoration-none'  to="register">Register Now?</Link>


</div>

<button className='btn btn-success d-block w-100 mt-2 mb-5'>Login</button>


            </form>

          </div>
        </div>
      </div>
    </div>
  </div>
    </>
  
}
