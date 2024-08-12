import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { DropzoneArea } from "mui-file-dropzone";
import axios from "axios";
import {
  EmailValidation,
  PasswordValidation,
} from "../../../../../constants/Validations";
import { toast } from 'react-toastify';
import { User_URls } from "../../../../../constants/End_Points";


export default function Register() {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  let password;
  let navigate = useNavigate();

  let{
    register,
    handleSubmit,
    control,
    watch,
    formState:{errors,isDirty, isValid,isSubmitting}
  } = useForm({ mode: "onChange" }); 

  password = watch("password", "");

  const appendToFormData = (data) => {
    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("country", data.country);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("profileImage", data.profileImage[0]);

    return formData;
  };
  let onSubmit = async (data) => {
    console.log(data);
    let registerData = appendToFormData(data);

    try {
      let response = await axios.post(User_URls.register, registerData);
      toast.success(response?.data?.message || "Register successfully");
      console.log(response);
      navigate("/verify-account");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data?.message);
    }
  };

  return (
    <div>
      <div className="text-start  ">
        <h5 className="mb-1 header-text ">Register</h5>
        <p className="text-logo">Welcome Back! Please enter your details </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-2">
              {/* userName */}
              {errors.userName && (
                <p className="text-danger">{errors.userName.message}</p>
              )}
              <div className="input-group ">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa-solid fa-mobile-screen icon-color"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  // onChange={handleOnChange}
                  placeholder="UserName"
                  aria-label="userName"
                  aria-describedby="basic-addon1"
                  {...register("userName", {
                    required: "UserName is required",
                  })}
                />
              </div>
              {/* country */}
              {errors.country && (
                <p className="text-danger">{errors.country.message}</p>
              )}
              <div className="input-group my-3 ">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa-solid fa-lock icon-color"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  // onChange={handleOnChange}
                  placeholder="Country"
                  aria-label="country"
                  aria-describedby="basic-addon1"
                  {...register("country", { required: "Country is required" })}
                />
              </div>

              {/* password */}
              {errors.password && (
                <p className="text-danger">{errors.password.message}</p>
              )}
              <div className="input-group pb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa-solid fa-lock icon-color"></i>
                </span>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  className="form-control"
                  placeholder="Password"
                  aria-label="password"
                  aria-describedby="basic-addon1"
                  {...register("password", PasswordValidation)}
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
                    className={`fa ${
                      isPasswordVisible ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-2">
              {/*email */}
              {errors.email && (
                <p className="text-danger">{errors.email.message}</p>
              )}

              <div className="input-group ">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa-solid fa-mobile-screen icon-color"></i>
                </span>
                <input
                  type="email"
                  className="form-control"
                  // onChange={handleOnChange}
                  placeholder="Enter Your E-mail"
                  aria-label="email"
                  aria-describedby="basic-addon1"
                  {...register("email", EmailValidation)}
                />
              </div>

              {/* phoneNumber */}
              {errors.phoneNumber && (
                <p className="text-danger ">{errors.phoneNumber.message}</p>
              )}
              <div className="input-group my-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa-solid fa-mobile-screen icon-color"></i>
                </span>
                <input
                  type="tel"
                  className="form-control"
                  // onChange={handleOnChange}
                  placeholder="PhoneNumber"
                  aria-label="phoneNumber"
                  aria-describedby="basic-addon1"
                  {...register("phoneNumber", {
                    required: "PhoneNumber is required",
                  })}
                />
              </div>
              {/* confirm pass */}
              {errors.confirmPassword && (
                <p className="text-danger">{errors.confirmPassword.message}</p>
              )}
              <div className="input-group pb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa-solid fa-mobile-screen icon-color"></i>
                </span>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  className="form-control"
                  placeholder="confirm-Password"
                  aria-label="confirmPassword"
                  aria-describedby="basic-addon1"
                  {...register("confirmPassword", {
                    required: "ConfirmPassword is required",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                />

                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                  }}
                  onMouseUp={(e) => {
                    e.preventDefault();
                  }}
                  className="input-group-text"
                  id="basic-addon1"
                  onClick={() => setIsPasswordVisible((prev) => !prev)}
                  aria-hidden="true"
                >
                  <span className="sr_only">
                    {isPasswordVisible ? "Hide Password" : "Show Password"}
                  </span>
                  <i
                    className={`fa ${
                      isPasswordVisible ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </button>
              </div>
            </div>
          </div>

          {/* {errors.profileImage && (
            <p className="text-danger">{errors.profileImage.message}</p>
          )} */}
          {/* <input
            type="file"
            className="form-control my-2"
            placeholder="Upload Image"
            aria-label="profileImage"
            aria-describedby="basic-addon1"
            {...register("profileImage", {
              required: "profileImage Name is required",
            })}
          /> */}
<div className="">
<Controller
                name="profileImage"
                rules={{ required: 'Profile Image is required'}}
                control={control}
                render={({ field }) => (
                    <DropzoneArea
                        acceptedFiles={['image/*']}
                        dropzoneText="Drag & Drop or Choose an Item Image to Upload"
                        filesLimit={1}
                        onChange={(files) => {
                            // console.log('Files:', files);
                            field.onChange(files);
                        }}
                    />
                )}
        /> 
</div>

        </div>

        <div className="links d-flex justify-content-end py-1 ">
          <Link
            className="text-success text-decoration-none Forget_link"
            to="/"
          >
            Login Now?
          </Link>
        </div>

        <button
          className="btn btn-success d-block w-100 mt-2 mb-4"
          type="submit"
          disabled={!isDirty || !isValid || isSubmitting}
        >
          Register
        </button>

      </form>
    </div>
  );
}
