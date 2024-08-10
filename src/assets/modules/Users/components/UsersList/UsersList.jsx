
import Header from '../../../Shared/components/Header/Header'
import RecipesImg from '../../../../reciptes.svg'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Base_Img_Url, UserRecipe_URL } from '../../../../../constants/End_Points'
import NoData from "../../../Shared/components/NoData/NoData";
import DeleteConfirmation from "../../../Shared/components/DeleteConfirmation/DeleteConfirmation";
import deleteGirl from '../../../../images/girl-delete.png'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function UsersList() {
  const [userRecipe, setUserRecipe] = useState([])
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setUserId(id);
    setShow(true);
  };
 

  let deleteUserRecipe = async ()=>{
    try { let response = await axios.delete(UserRecipe_URL.delete(userId),
      {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`},}) 
      toast.success('Deleted Successfully')
      getUserRecipe()
      handleClose()

    
      
    } catch (error) {
      toast.error('Failed Delete')
    }
  }
let getUserRecipe = async ()=>{
  try{
    let response= await axios.get(UserRecipe_URL.getList,
      {
        headers:{Authorization:`Bearer ${localStorage.getItem("token")}`},} )
      setUserRecipe(response.data.data)
      console.log(respresponse.data.dataonse)
  } catch(error){
    
  }
}

useEffect(()=>{
  getUserRecipe()

},[])




  return (
    <div>
    <Header imgUrl={RecipesImg} 
title={"Users"}  
title2={"List"}
description={"You can now add your items that any user can order it from the Application and you can edit"}
/>
<div className="title-info mx-4 montserrat">
          <h4 className="">Users Table Details</h4>
          <p className='title-shared'>You can check all details</p>
          <span> </span>
        </div>




        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className=" mx-3">
          <DeleteConfirmation deleteItem={"Recipe"}></DeleteConfirmation>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteUserRecipe}>
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>


      <div className="table-container mx-4 ">
        <table className="table text-center">
          <thead className="table-secondary">
            <tr>
              <th scope="col" className="th-first py-4 ps-2 ">Name</th>
              <th scope="col"  className=" py-4 ">Image</th>
              <th scope="col"  className=" py-4 ">Price</th>
              <th scope="col"  className=" py-4 ">Description</th>
              <th scope="col"  className=" py-4 ">Discount</th>
              <th scope="col"  className=" py-4 ">Category</th>
              <th scope="col" className="th-last py-4 pe-2"></th>
            </tr>
          </thead>
          <tbody className="">
            {userRecipe.length > 0 ? (
              userRecipe.map((userRecipe) => (
                <tr key={userRecipe.id}>
                  <td>{userRecipe.name}</td>

                  <td className="td_Img">
                    {userRecipe.imagePath ? (
                      <img
                        src={`${Base_Img_Url}/${userRecipe.imagePath}`}
                        alt=""
                        className="imgRecipe rounded-3"
                      />
                    ) : (
                      <img src={deleteGirl} className="imgRecipe rounded-3" />
                    )}
                  </td>
                  <td className='ps-2'>{userRecipe.price}</td>
                  <td>{userRecipe.description}</td>
                  <td>{userRecipe.discount}</td>
                  <td>{userRecipe.category.name}</td>

                  <td className='tabledDrop pe-2'>
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
                          <button
                            className="dropdown-item"
                            type="button"
                            onClick={() => handleShow(userRecipe.id)}
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






  )
}
