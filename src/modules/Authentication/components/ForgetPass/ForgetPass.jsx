import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { User_URls } from '../../../../constants/End_Points';
import { EmailValidation } from '../../../../constants/Validations';
import { useBeforeunload } from 'react-beforeunload';

export default function ForgetPass() {
  let navigate = useNavigate();
  let{
    register,
    handleSubmit,
    formState:{errors,isDirty, isValid,isSubmitting}
  } = useForm({ mode: "onChange" }); 
  let onSubmit = async (data)=>{
    try{
      let response = await axios.post(
        User_URls.resetRequest,data
        
      )
      toast.success(response?.data?.message ||"OTP Send Successfully")
      console.log(response)
      navigate("/reset-password")
    } catch(error){
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data?.message)
    }
  };

  useBeforeunload((event) => {
    event.preventDefault();
    console.log("beforeunload happened!");
  });
  return <>
 



            <div className="text-start mt-3 mb-5">
              <h5 className='mb-1 header-text '>Forget Your Password?</h5>
              <p className='text-logo'>No worries! Please enter your email and we will send a password reset link </p>
  


</div>
            <form onSubmit={handleSubmit(onSubmit)}>
              
            <div className="input-group pb-4">
  <span className="input-group-text" id="basic-addon1"><i className='fa-regular fa-envelope icon-color'></i></span>
  <input type="email" className="form-control" placeholder="Enter Your Email" aria-label="email" 
  aria-describedby="basic-addon1"
  {...register('email',EmailValidation)}/>
</div>

{errors.email && <p className='text-danger'>{errors.email.message}</p>}

<button className='btn btn-success d-block w-100 my-5'type="submit"
   disabled={!isDirty || !isValid || isSubmitting}>Submit</button>


            </form>

    </>
}
