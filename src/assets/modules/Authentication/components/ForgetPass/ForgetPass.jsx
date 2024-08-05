import React from 'react'
import logo from "../../../../images/logo.png"
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { User_URls } from '../../../../../constants/End_Points';
import { EmailValidation } from '../../../../../constants/Validations';

export default function ForgetPass() {
  let navigate = useNavigate();
  let{
    register,
    handleSubmit,
    formState:{errors,isDirty, isValid}
  } = useForm({ mode: "onChange" }); 
  let onSubmit = async (data)=>{
    try{
      let response = await axios.post(
        User_URls.resetRequest,data
        
      )
      toast.success("OTP Send successfully")
      console.log(response)
      navigate("/reset-password")
    } catch(error){
      toast.error(error.response.data.message);
      console.log(error.response.data.message)
    }
  };
  return <>
 



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
  {...register('email',EmailValidation)}/>
</div>



<button className='btn btn-success d-block w-100 my-5'type="submit"
   disabled={!isDirty || !isValid}>Submit</button>


            </form>

    </>
}
