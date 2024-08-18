import { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext'

export default function TitelsPages({ TitleHead, button ,btnClick}) {
  let { loginData } = useContext(AuthContext);
  return (
    <div>
      <div className=" mx-4  d-flex justify-content-between align-items-center ">
        
        <div className="montserrat">
          <h4 className="">{TitleHead} Table Details</h4>
          <p className="title-shared">You can check all details</p>
          
        </div>
        {loginData?.userGroup == "SuperAdmin" ?  
        <button  className="btn btn_pages btn-success green-bg" onClick={btnClick}>Add New {button}</button> :""}

       
      </div>
    </div>
  );
}
