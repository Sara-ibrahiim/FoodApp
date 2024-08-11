
import logo from "../../../../images/logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useBlocker, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { User_URls } from "../../../../../constants/End_Points";
import { EmailValidation } from "../../../../../constants/Validations";
import { useBeforeunload } from "react-beforeunload";

//import useCustomPrompt from "../../../Users/components/useCustomPrompt/useCustomPrompt";
//import React, { useCallback, useRef, useState } from "react";
import React, {useState } from "react";
export default function Login({ saveLoginData }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  //const [value, setValue] = useState('');
  // const data = { title: 'Are you Sure', content: 'you have unsaved data' };

  // const handleOnChange = useCallback((e) => setValue(e.target.value), []);
  //  useCustomPrompt(
  //   {
  //     title: 'Warning!',
  //     content: 'You have entered data that will be lost if you exit the page',
  //   },
  //   !!value
  // );
  //   let BlockingForm = () => {
 
  //  let [isBlocking, setIsBlocking] = useState(false);
  //   usePrompt(
  //     "Hello from usePrompt -- Are you sure you want to leave?",
  //     isBlocking
  //   );
  // }

  useBeforeunload((event) => {
    event.preventDefault();
    console.log("beforeunload happened!");
  });
  let navigate = useNavigate();

   


  
  let {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid ,isSubmitting },
  } = useForm({ mode: "onChange" });
  let onSubmit = async (data) => {
    try {
      let response = await axios.post(User_URls.login, data);
      toast.success(response?.data?.message ||"Login successfully");
      console.log(response);
      localStorage.setItem("token", response.data.token);
      saveLoginData();
      setIsBlocking(false);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data?.message);
    }
  };
   
 

  return (
    <>
      <div className="text-start mt-3 pb-3">
        <h5 className="mb-1 header-text ">Login</h5>
        <p className="text-logo">Welcome Back! Please enter your details </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} method="post">
        {errors.email && <p className="text-danger">{errors.email.message}</p>}
        <div className="input-group ">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa-solid fa-mobile-screen icon-color"></i>
          </span>
          <input
            type="email"      
            className="form-control"
           // onChange={handleOnChange}
            placeholder="Enter Your Email"
            aria-label="email"
            aria-describedby="basic-addon1"
            {...register("email", EmailValidation)}
          />
        </div>


        
        {errors.password && (
          <p className="text-danger">{errors.password.message}</p>
        )}
        <div className="input-group mb-1 mt-4">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa-solid fa-lock icon-color"></i>
          </span>
          <input
            type={isPasswordVisible ? "text" : "password"}
            className="form-control"
            placeholder="Password"
        
            //onChange={handleOnChange}
            aria-label="password"
            aria-describedby="basic-addon1"
            {...register("password", {
              required: "password is required",
              pattern: {
                //value: {value},
                value: '',
                message: "password should be valid password ",
              },
            })}
          />
          <button
            onMouseDown={(e) => {
              e.preventDefault();
            }}
            onMouseUp={(e) => {
              e.preventDefault();
            }}
            aria-hidden="true"
            type="button"
            className="input-group-text"
            id="basic-addon1"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
          >
            <span className="sr_only">
              {isPasswordVisible ? "Hide Password" : "Show Password"}
            </span>
            <i
              className={`fa ${isPasswordVisible ? "fa-eye-slash" : "fa-eye"}`}
            ></i>
          </button>
        </div>
        <div className="links d-flex justify-content-between pb-3">
          <Link
            className=" text-dark text-decoration-none register_link"
            to="/register"
          >
            Register Now?
          </Link>
          <Link
            className="text-success text-decoration-none Forget_link"
            to="/forget-password"
          >
            Forget Password?
          </Link>
        </div>

        <button
          className="btn btn-success d-block w-100 mt-2 mb-5"
          type="submit"
          disabled={!isDirty || !isValid || isSubmitting}
        >
          Login
        </button>

      
      </form>
    </>
  );
}
