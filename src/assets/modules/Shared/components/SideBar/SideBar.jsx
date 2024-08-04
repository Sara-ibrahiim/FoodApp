import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import toggler from '../../../../images/icon.png'

function SideBar() {

const [isCollapse, setIsCollapse] = useState(false)
const navigate = useNavigate();
let togglerCollapse =() =>{
    setIsCollapse(!isCollapse)
}

return  <>
        
<div className='bg-sidebar' style={{position:'sticky',height:"100vh"}}>

<Sidebar collapsed={isCollapse} className='h-100'>
  <Menu className='h-100'>
   
      <MenuItem className='text-white firstRow-sideBar py-5  ' 
      onClick={togglerCollapse} icon={<img src={toggler} style={{
    width: isCollapse ? "4rem" : "8rem",
    transition: "all 300ms",

  }} alt="" />} >  </MenuItem>



  <MenuItem className='text-white' icon={
 <i className="fa-solid fa-house"></i>
  } component={<Link to="/dashboard" />}> Home</MenuItem>
    <MenuItem className='text-white' icon={<i className="fa-solid  fa-user-group"></i>} component={<Link to="/dashboard/users" />}> Users</MenuItem>
    <MenuItem className='text-white' icon={<i className="fa-solid fa-table-cells-large"></i>} component={<Link to="/dashboard/recipesList" />}>  Recipes</MenuItem> 
    
    <MenuItem className='text-white' icon={<i className="fa-regular fa-calendar-days"></i>} component={<Link to="/dashboard/categoriesList" />}>  Categories</MenuItem> 
    <MenuItem className='text-white ' icon={<i className="fa-solid fa-right-from-bracket"></i>}
    onClick={()=>{
      localStorage.removeItem("token")
      navigate("/login")
    }}  > Logout</MenuItem> 
     </Menu>
</Sidebar>

</div>
            
        </>
    
}

export default SideBar;