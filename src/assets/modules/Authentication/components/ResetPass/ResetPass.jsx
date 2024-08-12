import React, { useState } from 'react'
import logo from "../../../../images/logo.png"
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { User_URls } from '../../../../../constants/End_Points';
import { useBeforeunload } from "react-beforeunload";
import { EmailValidation, PasswordValidation } from '../../../../../constants/Validations';


export default function ResetPass() {
  let password;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  let navigate = useNavigate();
  let{
    register,
    handleSubmit,
    watch,
    formState:{errors,isDirty, isValid,isSubmitting}
  } = useForm({ mode: "onChange" }); 
  
  password = watch("password", "");
  let onSubmit = async (data)=>{
    try{
      let response = await axios.post(
        User_URls.reset,data
        
      )
      toast.success(response?.data?.message ||"Password Changed")
      console.log(response)
      navigate("/")
    } catch(error){
      toast.error(error?.response?.data.message);
      console.log(error?.response?.data?.message)
    }
  };

  useBeforeunload((event) => {
    event.preventDefault();
    console.log("beforeunload happened!");
  });
  return <>

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
  {...register('email',EmailValidation)}/>
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
  <span className="input-group-text" id="basic-addon1">
    <i className='fa-solid fa-lock icon-color'></i></span>
  <input type={isPasswordVisible? "text" : "password"} className="form-control" placeholder="Password"
   aria-label="password" aria-describedby="basic-addon1"
  {...register('password',PasswordValidation)} />
   <button
      onMouseDown={(e)=>{e.preventDefault()}}
      onMouseUp={(e)=>{e.preventDefault()}}
         aria-hidden="true"
       type='button' className="input-group-text" id="basic-addon1"
    onClick={()=>setIsPasswordVisible(prev=>!prev)}>
        <span className='sr_only'>{isPasswordVisible? "Hide Password":"Show Password"}</span> 
   <i className={`fa ${isPasswordVisible? "fa-eye-slash":"fa-eye"}`}></i></button>
</div>



{errors.confirmPassword && <p className='text-danger'>{errors.confirmPassword.message}</p>}
<div className="input-group pb-3">
  <span className="input-group-text" id="basic-addon1">       
  
      <i className='fa-solid fa-lock icon-color'></i></span>
  <input type={isPasswordVisible? "text" : "password"} className="form-control" placeholder="Confirm New Password"
   aria-label="confirmPassword" aria-describedby="basic-addon1"
   {...register('confirmPassword',{
    required:"ConfirmPassword is required",
    validate: (value) => value === watch("password") || "Passwords do not match"
  })} />
   <button type='button'  
 

   
    onMouseDown={(e)=>{e.preventDefault()}}
   onMouseUp={(e)=>{e.preventDefault()}}
    className="input-group-text" id="basic-addon1"
    onClick={()=>setIsPasswordVisible(prev=>!prev)}
    aria-hidden="true">
      
        <span className='sr_only'>{isPasswordVisible? "Hide Password":"Show Password"}
        </span> 
   <i className={`fa ${isPasswordVisible? "fa-eye-slash":"fa-eye"}`}></i></button>
</div>


<button className='btn btn-success d-block w-100 my-2' type="submit"
   disabled={!isDirty || !isValid || isSubmitting}>Reset Password</button>


            </form>


    </>
}
