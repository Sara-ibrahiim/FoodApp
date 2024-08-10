import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import {
  Link,
  Navigate,
  NavLink,
  useNavigate,
} from "react-router-dom";
import toggler from "../../../../images/icon.png";

function SideBar() {

  const [isCollapse, setIsCollapse] = React.useState(() => {
    const storedValue = localStorage.getItem("isCollapsible");
    if (!storedValue) return false;

    return JSON.parse(storedValue);
  });

  const navigate = useNavigate();
  let togglerCollapse = () => {
    setIsCollapse(!isCollapse);

    localStorage.setItem("isCollapse",!isCollapse)
  };


  return (
    <>
      <div
        classNameName="bg-sidebar"
        style={{ position: "sticky", top:"0" , left: "0",height:"100vh"}}
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
              className="text-white firstRow-sideBar py-5  "
              onClick={togglerCollapse}
            
              icon={
                <img
                  src={toggler}
                  style={{
                    width: isCollapse ? "5rem" : "8rem",
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
            <MenuItem
              className="text-white "
              icon={<i className="fa-solid  fa-user-group"></i>}
              component={<NavLink to="/dashboard/users" />}
            >
              {" "}
              Users
            </MenuItem>
            <MenuItem
              className="text-white "
              icon={<i className="fa-solid fa-table-cells-large"></i>}
              component={<NavLink to="/dashboard/recipesList" />}
            >
              {" "}
              Recipes
            </MenuItem>

            <MenuItem
              className="text-white "
              icon={<i className="fa-regular fa-calendar-days"></i>}
              component={<NavLink to="/dashboard/categoriesList" />}
            >
              {" "}
              Categories
            </MenuItem>
            <MenuItem
              className="text-white "
              icon={<i className="fa-solid fa-right-from-bracket"></i>}
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
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
