import React, { useEffect, useState } from "react";
import Header from "../../../Shared/components/Header/Header";
import FAVImg from "../../../../assets/reciptes.svg";
import axios from "axios";
import { Base_Img_Url, UserRecipe_URL } from "../../../../constants/End_Points";
import { toast } from "react-toastify";
import deleteGirl from "../../../../assets/images/girl-delete.png";
import LoadingScreen from "../../../Shared/components/LoadingScreen/LoadingScreen";
export default function Favourites() {
  const [favList, setFavList] = useState([]);
  const[isLoading,setLoading] = useState(false);
  // const [arrayOffPages, setArrayOffPages] = useState([])
  let getFavList = async (PageSize, pageNo) => {
  
    try {
      let response = await axios.get(UserRecipe_URL.getList, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: { pageSize: PageSize, pageNumber: pageNo },
      });
      // setArrayOffPages(Array(response.data.totalNumberOfPages).fill().map((_,i)=>i+1))
      setFavList(response.data.data);
      setTimeout(() => {
        setLoading(false);
      }, 800);
    } catch (error) {
      console.log(response);
    }

    //totalNumberOfRecords
  };
  let removeFav = async (id) => {
    try {
      let response = await axios.delete(UserRecipe_URL.removeFav(id), {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Item Successfully Removed");
      getFavList();
    } catch (error) {
      console.log(response);
    }
  };
  useEffect(() => {
    setLoading(true);
    getFavList(30, 1);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  return (
    
   <div>
    {!isLoading ?
      <div>

      
      <Header
        title={"Favourites"}
        title2={"Items!"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={FAVImg}
      />

      {favList.length > 0 ? (
        <div className="mx-5 mt-5 mb-2 ps-2 overflow-x-hidden">
          <div className="row">
            {favList.map((fav) => (
              <div key={fav.id} className="col-md-4 mb-5">
                <div className="text-black bg-white shadow rounded-4 box-fav">
                  <img
                    src={`${Base_Img_Url}/${fav.recipe.imagePath}`}
                    alt=""
                    className="w-100 rounded-4 pic-fav"
                  />
                  <div className="p-3">
                    <h3>{fav.recipe.name}</h3>
                    <div className="d-flex justify-content-between">
                      <p>{fav.recipe.description}</p>
                      <i
                        className="fa-solid fa-trash-can pointer text-danger"
                        onClick={() => removeFav(fav.id)}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center mb-0 container">
          <div className="Nodata w-50">
            <img src={deleteGirl} className="nodata_img" />
            <h5 className="">NoData !</h5>
            <span className="dark_gray">
              are you sure you want to delete this item ? <br />
              if you are sure just click on delete it
            </span>
            <p className="light_gray"></p>
          </div>
        </div>
      )}

      {/* <ul className="pagination mb-3 mx-4 justify-content-end">
    <li className="page-item">
      <a className="page-link" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>

    {arrayOffPages.map((pageNo)=>(
   <li onClick={()=> getFavList(30,pageNo)} 
   className="page-item" key={pageNo}><a className="page-link">{pageNo}</a></li>
    ))}

   
    <li className="page-item">
      <a className="page-link"  aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
     */}
    </div>
    
    
    :<LoadingScreen/> }
    
    </div>
  );
}
