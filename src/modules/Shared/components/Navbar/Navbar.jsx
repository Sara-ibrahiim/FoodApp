import React, { useContext } from 'react'
import Icon from '../../../../assets/images/iconframe.png'
import { AuthContext } from '../../../../context/AuthContext'
export default function Navbar() {
  let {loginData} =useContext(AuthContext);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light my-3  mx-4 rounded-4">
    <div className="container-fluid">
    <form className="form-inline my-2 my-lg-0 w-75 me-3">
    <div className="form-group nav-search">
    <span className="fa fa-search form-control-feedback"></span>
      <input className="form-control mr-sm-2 rounded-2 " 
      type="search" placeholder="Search Here" aria-label="Search" />
   </div>
  

    </form>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
       data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
       aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
     
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-3">
        <img src={Icon} alt="" className='img-navbar me-2'/>
          <li className="nav-item pt-2 me-4"> 
         
          {loginData?.userName}
        </li>

      
      <i className=" nav-item fa-solid fa-bell me-4 pt-3  "></i>
       
      
        </ul>
       </div>
    </div>
  </nav>
  )
}
