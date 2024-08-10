import { useNavigate } from "react-router-dom";
export default function TitelsPages({ TitleHead, button }) {

  return (
    <div>
      <div className=" m-4 d-flex justify-content-between align-items-center ">
        
        <div className="montserrat">
          <h4 className="">{TitleHead} Table Details</h4>
          <p className="title-shared">You can check all details</p>
          
        </div>

        <button  className="btn btn_pages btn-success green-bg">Add New {button}</button>
      </div>
    </div>
  );
}
