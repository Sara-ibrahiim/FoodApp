import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { EmailValidation } from "../../../../constants/Validations";
import { User_URls } from "../../../../constants/End_Points";
import axios from "axios";
import { toast } from "react-toastify";

export default function VerifyAccount() {
  let navigate = useNavigate();

  let {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });

  let onSubmit = async (data) => {
    try {
      let response = await axios.put(User_URls.verify, data);
      toast.success(response?.data?.message || "Code Send Successfully");
      console.log(response);
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data?.message);
    }
  };
  return (
    <div>
      <div className="text-start mt-3 pb-3">
        <h5 className="mb-1 header-text ">Verify Account</h5>
        <p className="text-logo">Welcome Back! Please enter your details </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
      
        <div className="input-group mb-2">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa-regular fa-envelope icon-color"></i>
          </span>
          <input
            type="email"
            className="form-control"
            placeholder="Enter Your Email"
            aria-label="email"
            aria-describedby="basic-addon1"
            {...register("email", EmailValidation)}
          />
        </div>
        {errors.email && <p className="text-danger">{errors.email.message}</p>}

       
        <div className="input-group mb-2 mt-3 ">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa-solid fa-lock icon-color"></i>
          </span>
          <input
            type="text"
            className="form-control"
            // onChange={handleOnChange}
            placeholder="Code"
            aria-label="code"
            aria-describedby="basic-addon1"
            {...register("code", {
              required: "Code is Required",
              //validate: (value, formValues) => value === '4',  ^[^\s]{4}$
              pattern: {
                value:/^[^\s]{4}$/,
                message: 'Code Must Be 4 Characters'
                }
      
            })}
          />
        </div>
        {errors.code && <p className="text-danger ">{errors.code.message}</p>}
        <button
          className="btn btn-success d-block w-100 mt-4 mb-5"
          type="submit"
          disabled={isSubmitting}
        >
          Verify
        </button>
      </form>
    </div>
  );
}
