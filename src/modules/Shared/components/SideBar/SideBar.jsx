import React, { useContext, useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import toggler from "../../../../assets/images/icon.png";
import { AuthContext } from '../../../../context/AuthContext'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ChangePassword from "../../../Authentication/components/ChangePassword/ChangePassword";
import logo from "../../../../assets/images/logo.png";
function SideBar() {
 const [showChange, setShowChange] = useState(false);//change
const handleCloseChange = () => setShowChange(false);
  let { loginData } = useContext(AuthContext);
  const [isCollapse, setIsCollapse] = React.useState(() => {
    const storedValue = localStorage.getItem("isCollapsible");
    if (!storedValue) return false;

    return JSON.parse(storedValue);
  });
  const show = () => {

    setShowChange(true);
  };

  const navigate = useNavigate();
  let togglerCollapse = () => {
    setIsCollapse(!isCollapse);

    localStorage.setItem("isCollapse", !isCollapse);

  
  };

  const logOut = ()=> {
    localStorage.removeItem("token");
              navigate("/login");
  }

  return (
    <>
    <div>


    <Modal show={showChange} onHide={handleCloseChange}>
      <div >
      <Modal.Header className="mb-0 pb-0">
        <div>
        <img src={logo} alt="food-logo" className="w-75 pt-2 ms-5 ps-5" />
        
        <div className=" mt-2">
   
      <h5 className=" text-start mb-1 header-change ">Change your Password</h5>
      <p className=" text-start text-logo">Enter your details below </p>
    </div>
        </div>

      </Modal.Header>
      {/* <Modal.Header closeButton></Modal.Header> */}
      </div>     
      
       <Modal.Body className="">

     <ChangePassword logOut={logOut}/>
       
        </Modal.Body>
      
      </Modal>

    </div>
      <div
        classNameName="bg-sidebar"
        style={{ position: "sticky", top: "0", left: "0", height: "100vh" }}
      >




        <Sidebar collapsed={isCollapse} className="h-100">
          <Menu
            className="h-100"
            menuItemStyles={{
              button: {
                [`&.active`]: {
                  backgroundColor: "#00924D1A",
                  color: "#b6c8d9",
                },
              },
            }}
          >
            <MenuItem
              className="text-white firstRow-sideBar py-5   "
              onClick={togglerCollapse}
              icon={
                <img
                  src={toggler}
                  style={{
                    width: isCollapse ? "6rem" : "10rem",
                    transition: "all 300ms",
                  }}
                  alt=""
                />
              }
            >
              {" "}
            </MenuItem>

            <MenuItem
              className="text-white  "
              icon={<i className="fa-solid fa-house"></i>}
              component={<NavLink to="/dashboard/home" />}
            >
              {" "}
              Home
            </MenuItem>
            {loginData?.userGroup == "SuperAdmin" ? (
              <MenuItem
                className="text-white "
                icon={<i className="fa-solid  fa-user-group"></i>}
                component={<NavLink to="/dashboard/users" />}
              >
                {" "}
                Users
              </MenuItem>
            ) : (
              ""
            )}

            <MenuItem
              className="text-white "
              icon={<i className="fa-solid fa-table-cells-large"></i>}
              component={<NavLink to="/dashboard/recipesList" />}
            >
              {" "}
              Recipes
            </MenuItem>

            {loginData?.userGroup == "SuperAdmin" ? (
              <MenuItem
                className="text-white "
                icon={<i className="fa-regular fa-calendar-days"></i>}
                component={<NavLink to="/dashboard/categoriesList" />}
              >
                {" "}
                Categories
              </MenuItem>
            ) : (
              ""
            )}

            {loginData?.userGroup != "SuperAdmin" ? (
              <MenuItem
                className="text-white "
                icon={<i className="fa-solid fa-heart"></i>}
                component={<NavLink to="/dashboard/favourites"/>}
              >
                {" "}
                Favourites
              </MenuItem>
            ) : (
              ""
            )}
                <MenuItem
              className="text-white  " onClick={show}
              icon={<i className="fa-solid fa-lock"></i>}
             // component={<NavLink to="//change-password"/>}
            >
              {" "}
              ChangePassword
            </MenuItem>

            <MenuItem
              className="text-white "
              icon={<i className="fa-solid fa-right-from-bracket"></i>}
              onClick={logOut
              //   () => {
              //   localStorage.removeItem("token");
              //   navigate("/login");
              // }
            }
            >
              {" "}
              Logout
            </MenuItem>
          </Menu>
        </Sidebar>



      </div>



    </>
  );
}

export default SideBar;
