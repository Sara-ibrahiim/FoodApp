import React from 'react'
import vector from '../../../../assets/images/x.png'
import robot from '../../../../assets/notfound.svg'
import icon from '../../../../assets/images/notfound.png'
import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <div>
     <div className='  '>
      <div className='  vh-100 bg-notfound '>
        <div className="container-fluid">
        <div className='row mx-2 '>

    <div className="py-3 my-3 d-flex " >
    <div className="img-found col-md-1 offset-md-1">
    <img src={icon} alt="" className='' />
 

    </div>  
    <div className='me-5 mt-5 ms-auto'>
        <img src={vector} alt=""  />
        </div> 
 </div>
        <div className="col-md-4 offset-md-1 pt-5  d-flex justify-content-center text-left-notfound ">

          <div>
          <h2 className=''>
          Oops. 
          </h2>
          <p className='notFound-text'>Page  not found </p>
          <h2 className='points'>...


          </h2>
          <p className='letter-notfound'>
          This Page doesn’t exist or was removed! <br/>
          We suggest you  back to home.
          </p>
          <button className='btn btn-success btn-notFound text-white w-100 mt-2  ' to="\home" >
            <Link to="/dashboard/home" className='d-flex justify-content-center text-white text-decoration-none'>
          <i className="fa-solid fa-arrow-left pt-3 text-end"></i>
          <p className='mx-3 pt-1 '>
          Back TO <br />
          Home

          </p>
          </Link>
         </button>
          </div>


        </div>
   
        <div className="col-md-6 d-flex justify-content-end offset-md-1   img-notfound">
        <div className="">
        

          <img src={robot} alt="" className='' />

        </div>

        </div>
   
        </div>
      </div>
      </div>
     </div>
    </div>
  )
}
