import Header from "../../../Shared/components/Header/Header";
import RecipesImg from "../../../../assets/reciptes.svg";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import TitelsPages from "../../../Shared/components/TitelsPages/TitelsPages";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Base_Img_Url, CATEGORIES_URL, GetAllTags, Recipe_URL, UserRecipe_URL } from "../../../../constants/End_Points";
import NoData from "../../../Shared/components/NoData/NoData";
import DeleteConfirmation from "../../../Shared/components/DeleteConfirmation/DeleteConfirmation";
import deleteGirl from '../../../../assets/images/girl-delete.png'
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../../../context/AuthContext'

export default function RecipesList() {
  let { loginData } = useContext(AuthContext);
  let navigate = useNavigate()
  const [show, setShow] = useState(false);
  const [RecId, setRecId] = useState(0);
  const handleClose = () => setShow(false);
  const [arrayOffPages, setArrayOffPages] = useState([])
  const [tagList, setTagList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [nameValue, setNameValue] = useState("")
  const [tagValue, setTagValue] = useState("")
  const [catValue, setCatValue] = useState("")
  const handleShow = (id) => {
    setRecId(id);
    setShow(true);
  };
  const [RecipeList, setRecipeList] = useState([]);

  let deleteRecipe = async () => {
    try {
      let response = await axios.delete(Recipe_URL.delete(RecId), {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Deleted Successfully");
      getRecipeList();
      handleClose();
    } catch (error) {
      toast.error('Failed Delete')
    }
  };
  let getRecipeList = async (pageS,pageN,nameInput,tagInput,catInput) => {
    try {
      let response = await axios.get(Recipe_URL.getList, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params:{pageSize: pageS, pageNumber: pageN,name: nameInput,tagId: tagInput, categoryId:catInput},
      });
      setArrayOffPages(Array(response.data.totalNumberOfPages).fill().map((_,i)=>i+1))
      setRecipeList(response.data.data);
      console.log(response.data.data);
    } catch (error) {}
  };

  let getCategoriesList = async () => {
    try {
      let response = await axios.get(CATEGORIES_URL.getList, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCategoriesList(response.data.data);
      console.log(response.data.data);
    } catch (error) {}
  };



  let getAllTags = async () => {
    try {
      let response = await axios.get(GetAllTags, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTagList(response.data);
    } catch (error) {}
  };
  const getNameValue = (input) =>{
    setNameValue(input.target.value);
    getRecipeList(7,1,input.target.value,tagValue,catValue);
  }

  const getTagValue = (input) =>{
    setTagValue(input.target.value);
    getRecipeList(7,1,nameValue,input.target.value,catValue);
  }
  const getCatValue = (input) =>{
    setCatValue(input.target.value);
    getRecipeList(7,1,nameValue,input.target.value,tagValue);
  }
  let addToFav = async (id) => {
    try {
      let response = await axios.post(UserRecipe_URL.addToFav,
        {recipeId:  id},{
          headers: {Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      toast.success(" Successfully Added To Favourites ")
      console.log(response)
      //setFavList(response.data.data)
  } catch (error) {
      console.log(response)
      toast.error("Failed Added To Favourites")
  }

  }
  useEffect(() => {
    getRecipeList(7,1,'');
    getAllTags();
    getCategoriesList();
  }, []);


  return (
    <div>
      <Header
        imgUrl={RecipesImg}
        title={"Recipes"}
        title2={"Items"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      />
     <div>
  
    </div>
      <TitelsPages TitleHead={"Recipes"} button={"Recipes"} btnClick={()=> navigate("/dashboard/recipes-data")}/>


  <div className="mx-4 row">
  <div className="form-group has-search col-md-7 pe-1">
  <span className="fa fa-search form-control-feedback"></span>
      <div className="input-group ">
      
           <input className="form-control"  onChange={getNameValue}
      type="search" placeholder="Search Here..." aria-label="Search" />
        
      
       </div>
       </div>


    <div className="col-md-2 select-recipes">
    <select
    onChange={getTagValue}
            placeholder="Tag"
            className="form-control "
            // {...register("tagId", {
            //   required: "Tag is required",
            // })}
          >
           <option value="" className="text-muted">Tag</option>
            {tagList.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
          {/* {errors.tagId && (
            <p className="text-danger my-3">{errors.tagId.message}</p>
          )} */}



     </div>

     <div className="col-md-2">
      
     <select
     onChange={getCatValue}
            placeholder="Category"
            className="form-control "
            // {...register("categoriesIds", {
            //   required: "Category is required",
            // })}
          >
        
            <option value="" className="text-muted bg-option">Category</option>
            {categoriesList.map((category) => (
              <option key={category.id} value={category.id} className="bg-option">
                {category.name}
              </option>
            ))}
          </select>
          {/* {errors.categoriesIds && (
            <p className="text-danger my-3">{errors.categoriesIds.message}</p>
          )} */}

     </div>

</div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="pt-0 mt-0">
          <DeleteConfirmation deleteItem={"Recipe"}></DeleteConfirmation>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={deleteRecipe}>
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="table-container  m-4 ">
        <table className="table text-center ">
          <thead className="table-secondary mb-1">
            <tr>
              <th scope="col" className="th-first py-4 ps-2 ">Item Name</th>
              <th scope="col" className=" py-4 ">Image</th>
              <th scope="col" className=" py-4 ">Price</th>
              <th scope="col" className=" py-4 ">Description</th>
              <th scope="col" className=" py-4 ">Tag</th>
              <th scope="col" className=" py-4 ">Category</th>
              <th scope="col" className="th-last py-4 pe-2"></th>
            </tr>
          </thead>
          <tbody className="">
            {RecipeList.length > 0 ? (
              RecipeList.map((Recipe) => (
                <tr key={Recipe.id}>
                  <td>{Recipe.name}</td>

                  <td className="td_Img">
                    {Recipe.imagePath ? (
                      <img
                        src={`${Base_Img_Url}/${Recipe.imagePath}`}
                        alt=""
                        className="imgRecipe rounded-3"
                      />
                    ) : (
                      <img src={deleteGirl} className="imgRecipe rounded-3" />
                    )}
                  </td>
                  <td className="ps-2">{Recipe.price}</td>
                  <td>{Recipe.description}</td>
                  <td>{Recipe.tag.id}</td>
                  <td>{Recipe.category.name}</td>
                  {loginData?.userGroup == "SuperAdmin" ? 
                  <td className="pe-2 tabledDrop">
                    <div className="dropdown">
                      <button
                        className="btn"
                        type="button"
                        id="dropdownMenu2"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        ...
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenu2"
                      >
                        <li>
                          <button className="dropdown-item" type="button">
                            <i className="fa-regular fa-eye ps-1 mx-2 icon-table"></i>
                            View
                          </button>
                        </li>
                        <li>
                          
                        <Link className="text-decoration-none" to={`/dashboard/recipes-Edit/${Recipe.id}`} state={{recipeData: Recipe,type: 'edit'}}>
                          <button className="dropdown-item" type="button">
                            <i className="fa-regular fa-pen-to-square icon-table ps-1 mx-2"></i>{" "}
                            Edit
                          </button>
                        </Link>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            type="button"
                            onClick={() => handleShow(Recipe.id)}
                          >
                            <i
                              className="fa-regular fa-trash-can  ps-1 mx-2 icon-table"
                              aria-hidden="true"
                            ></i>{" "}
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
  :(<td className="pe-4">

<i onClick={()=>addToFav(Recipe.id)} class="fa-regular fa-heart text-success mt-1"></i>
  </td>)}

                </tr>
              ))
            ) : (
              <NoData />
            )}
          </tbody>
        </table>

        <ul className="pagination my-2 justify-content-end">
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>

    {arrayOffPages.map((pageN)=>(
   <li onClick={()=> getRecipeList(7,pageN)} 
   className="page-item" key={pageN}><a className="page-link" href="#">{pageN}</a></li>
    ))}
 
   
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
      </div>
    </div>
  );
}
