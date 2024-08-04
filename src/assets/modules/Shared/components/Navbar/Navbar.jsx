import React from 'react'
import Icon from '../../../../images/iconframe.png'
export default function Navbar({loginData}) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py3 m-3 rounded-4">
    <div className="container-fluid">
    <form class="form-inline my-2 my-lg-0 w-75 me-3">
      <input class="form-control mr-sm-2 rounded-2 text-muted" type="search" placeholder="SearchHere" aria-label="Search"/>
    
    </form>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
       data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
       aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
     
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-3">
        <img src={Icon} alt="" className=' me-2'/>
          <li className="nav-item pt-2"> 
         
          {loginData?.userName}
        </li>

      
      <i className=" nav-item fa-solid fa-bell mx-4 pt-3  "></i>
       
      
        </ul>
       </div>
    </div>
  </nav>
  )
}
