import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import logo from "../../../../images/logo.png";
export default function AuthLayout() {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  });

  return (
    <div className="auth-container">
      <div className="container-fluid bg-overlay">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-5 bg-white py-3 px-5 text-center rounded rounded-2  ">
            <div className="">
              <img src={logo} alt="food-logo" className="w-50 pt-4" />

              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
