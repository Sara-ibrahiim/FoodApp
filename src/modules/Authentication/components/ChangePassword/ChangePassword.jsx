import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { PasswordValidation } from '../../../../constants/Validations';
import { User_URls } from "../../../../constants/End_Points";
import axios from "axios";
import { toast } from "react-toastify";



export default function ChangePassword({logOut}) {
    let password;
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
//  let navigate = useNavigate();

  let {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });

  let onSubmit = async (data) => {
    try {
      let response = await axios.put(User_URls.ChangePassword, data ,{
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },});
      toast.success(response?.data?.message ||"Password Change Successfully");
      console.log(response);
      logOut()
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data?.message);
    }
  };
  return (

    
    <div>





    
      <form onSubmit={handleSubmit(onSubmit)}>




<div className="input-group pb-3">
  <span className="input-group-text" id="basic-addon1">
    <i className='fa-solid fa-lock icon-color'></i></span>
  <input type={isPasswordVisible? "text" : "password"} className="form-control" placeholder="Old Password"
   aria-label="oldPassword" aria-describedby="basic-addon1"
  {...register('oldPassword',PasswordValidation)} />
   <button
      onMouseDown={(e)=>{e.preventDefault()}}
      onMouseUp={(e)=>{e.preventDefault()}}
         aria-hidden="true"
       type='button' className="input-group-text" id="basic-addon1"
    onClick={()=>setIsPasswordVisible(prev=>!prev)}>
        <span className='sr_only'>{isPasswordVisible? "Hide Password":"Show Password"}</span> 
   <i className={`fa ${isPasswordVisible? "fa-eye-slash":"fa-eye"}`}></i></button>
</div>
{errors.oldPassword && <p className='text-danger ms-2'>{errors.oldPassword.message}</p>}






<div className="input-group pb-3">
  <span className="input-group-text" id="basic-addon1">
    <i className='fa-solid fa-lock icon-color'></i></span>
  <input type={isPasswordVisible? "text" : "password"} className="form-control" placeholder="New Password"
   aria-label="newPassword" aria-describedby="basic-addon1"
  {...register('newPassword',
    {
    required:"The New Password is required",
    validate: (value) => value != watch("oldPassword") || "This Is The Same Old Password, Change It",
    pattern:{
        value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$ !%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        message:"The New Password Should be valid password ",
    
      },
 })} />
   <button
      onMouseDown={(e)=>{e.preventDefault()}}
      onMouseUp={(e)=>{e.preventDefault()}}
         aria-hidden="true"
       type='button' className="input-group-text" id="basic-addon1"
    onClick={()=>setIsPasswordVisible(prev=>!prev)}>
        <span className='sr_only'>{isPasswordVisible? "Hide Password":"Show Password"}</span> 
   <i className={`fa ${isPasswordVisible? "fa-eye-slash":"fa-eye"}`}></i></button>
</div>
{errors.newPassword && <p className='text-danger ms-2'>{errors.newPassword.message}</p>}






<div className="input-group pb-3">
  <span className="input-group-text" id="basic-addon1">       
  
      <i className='fa-solid fa-lock icon-color'></i></span>
  <input type={isPasswordVisible? "text" : "password"} className="form-control" placeholder="Confirm New Password"
   aria-label="confirmNewPassword" aria-describedby="basic-addon1"
   {...register('confirmNewPassword',{
    required:"The ConfirmPassword is required",
    validate: (value) => value === watch("newPassword") || "Passwords do not match"
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
{errors.confirmNewPassword && <p className='text-danger ms-2'>{errors.confirmNewPassword.message}</p>}
        <button
          className="btn btn-success d-block w-100 mt-2 mb-2"
          type="submit"
          disabled={isSubmitting}
        >
          Change Password
        </button>
      </form>

    </div>
  );
}
