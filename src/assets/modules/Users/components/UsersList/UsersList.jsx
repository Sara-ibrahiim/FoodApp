
import Header from '../../../Shared/components/Header/Header'
import RecipesImg from '../../../../reciptes.svg'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Base_Img_Url, User_URls } from '../../../../../constants/End_Points'
import NoData from "../../../Shared/components/NoData/NoData";
import DeleteConfirmation from "../../../Shared/components/DeleteConfirmation/DeleteConfirmation";
import deleteGirl from '../../../../images/girl-delete.png'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


export default function UsersList() {
  const [Users, setUsers] = useState([])
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setUserId(id);
    setShow(true);
  };
 

  let deleteUsers = async ()=>{
    try { let response = await axios.delete(User_URls.delete(userId),
      {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`},}) 
      toast.success('Deleted Successfully')
      getUsers()
      handleClose()

    
      
    } catch (error) {
      toast.error('Failed Delete')
    }
  }
let getUsers = async ()=>{
  try{
    let response= await axios.get(User_URls.getList,
      {
        headers:{Authorization:`Bearer ${localStorage.getItem("token")}`},
      })
      setUsers(response.data.data)
      console.log(response.data.data)
  } catch(error){
    
  }
}

useEffect(()=>{
  getUsers()

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
          <Button variant="danger" onClick={deleteUsers}>
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
              <th scope="col"  className=" py-4 ">Email</th>
              <th scope="col"  className=" py-4 ">Phone</th>
              <th scope="col" className="th-last py-4 pe-2"></th>
            </tr>
          </thead>
          <tbody className="">
            {Users.length > 0 ? (
              Users.map((User) => (
                <tr key={User.id}>
                  <td>{User.userName}</td>

                  <td className="td_Img">
                    {Users.imagePath ? (
                      <img
                        src={`${Base_Img_Url}/${User.imagePath}`}
                        alt=""
                        className="imgRecipe rounded-3"
                      />
                    ) : (
                      <img src={deleteGirl} className="imgRecipe rounded-3" />
                    )}
                  </td>
                  <td className='ps-2'>{User.email}</td>
                  <td>{User.phoneNumber}</td>
              

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
                            onClick={() => handleShow(User.id)}
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
