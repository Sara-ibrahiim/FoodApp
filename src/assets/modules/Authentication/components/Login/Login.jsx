import React, { useState } from 'react'
import logo from "../../../../images/logo.png"
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { User_URls } from '../../../../../constants/End_Points';
import { EmailValidation, PasswordValidation } from '../../../../../constants/Validations';

export default function Login({saveLoginData}) {
  let navigate = useNavigate();
  let{
    register,
    handleSubmit,
    formState:{errors}
  } = useForm(); 
  let onSubmit = async (data)=>{
    try{
      let response = await axios.post(
        User_URls.login,data
        
      )
      toast.success("Login successfully")
      console.log(response)
      localStorage.setItem("token",response.data.token);
      saveLoginData()
      navigate("/dashboard")
    } catch(error){
      toast.error(error.response.data.message);
      console.log(error.response.data.message)
    }
  };
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  return <>

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
  {...register('email',EmailValidation)}/>
</div>
{errors.password && <p className='text-danger'>{errors.password.message}</p>}
<div className="input-group mb-1 mt-4">
  <span className="input-group-text" id="basic-addon1">
    <i className='fa-solid fa-lock icon-color'></i></span>
  <input type={isPasswordVisible? "text" : "password"} className="form-control" placeholder="Password"
   aria-label="password" aria-describedby="basic-addon1"
  {...register('password',PasswordValidation)} 

  />
   <button 
   onMouseDown={(e)=>{e.preventDefault()}}
   onMouseUp={(e)=>{e.preventDefault()}}
      aria-hidden="true"
   type='button' className="input-group-text" id="basic-addon1"
    onClick={()=>setIsPasswordVisible(prev=>!prev)}>
              <span className='sr_only'>{isPasswordVisible? "Hide Password":"Show Password"}</span> 
   <i className={`fa ${isPasswordVisible? "fa-eye-slash":"fa-eye"}`}></i></button>
</div>
<div className="links d-flex justify-content-between pb-3">
            <Link className='text-dark text-decoration-none' to="forget-password">Forget Password?</Link>
              <Link className='text-success text-decoration-none'  to="register">Register Now?</Link>


</div>

<button className='btn btn-success d-block w-100 mt-2 mb-5'>Login</button>


            </form>

    </>
  
}
