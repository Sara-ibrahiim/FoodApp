import Header from "../../../Shared/components/Header/Header";
import RecipesImg from "../../../../reciptes.svg";
import React, { useEffect, useState } from "react";
import axios from "axios";
import TitelsPages from "../../../Shared/components/TitelsPages/TitelsPages";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Base_Img_Url, Recipe_URL } from "../../../../../constants/End_Points";
import NoData from "../../../Shared/components/NoData/NoData";
import DeleteConfirmation from "../../../Shared/components/DeleteConfirmation/DeleteConfirmation";
import deleteGirl from '../../../../images/girl-delete.png'
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from "react-router-dom";

export default function RecipesList() {
  
  let navigate = useNavigate()
  const [show, setShow] = useState(false);
  const [RecId, setRecId] = useState(0);
  const handleClose = () => setShow(false);
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
  let getRecipeList = async () => {
    try {
      let response = await axios.get(Recipe_URL.getList, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setRecipeList(response.data.data);
      console.log(response.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    getRecipeList();
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


  <div className="mx-4 my-2 d-flex ">
  <div className="form-group has-search col-md-6 w-75">
    <span className="fa fa-search form-control-feedback"></span>
      <div className="input-group ">
      
           <input className="form-control  " 
      type="search" placeholder="Search Here..." aria-label="Search" />
        
       </div>
       </div>
    <div className="col-md-4 d-flex">

     <Dropdown className="mx-2">
      <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
       Tag
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
      </Dropdown.Menu>
    </Dropdown>

    <Dropdown>
      <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
      Category
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
      </Dropdown.Menu>
    </Dropdown>



     </div>

</div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="mx-3  ">
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

                  <td className="pe-2 tabledDrop">
                    <div className="dropdown">
                      <button
                        className="btn  "
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
                          <button className="dropdown-item" type="button">
                            <i className="fa-regular fa-pen-to-square icon-table ps-1 mx-2"></i>{" "}
                            Edit
                          </button>
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
                </tr>
              ))
            ) : (
              <NoData />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
