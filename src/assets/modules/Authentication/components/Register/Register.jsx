import React from 'react'
import { EmailValidation } from '../../../../../constants/Validations'

export default function Register() {
  return (
    <div>
      <div className="text-start mt-3 pb-3">
        <h5 className="mb-1 header-text ">Register</h5>
        <p className="text-logo">Welcome Back! Please enter your details </p>
      </div>

      <form >
        <div className="row">
        <div className="col-md-6">
            <div className="mb-3">
         {/* {errors.userName && <p className="text-danger">{errors.userName.message}</p>} */}
        <div className="input-group ">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa-solid fa-mobile-screen icon-color"></i>
          </span>
          <input
            type="userName"      
            className="form-control"
           // onChange={handleOnChange}
            placeholder="Enter Your userName"
            aria-label="userName"
            aria-describedby="basic-addon1"
            // {...register("userName", EmailValidation)}
          />
        </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
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
            //{...register("email", EmailValidation)}
          />
        </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
