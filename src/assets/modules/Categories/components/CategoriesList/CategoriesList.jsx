import React, { useEffect, useState } from "react";
import Header from "../../../Shared/components/Header/Header";
import RecipesImg from "../../../../reciptes.svg";
import axios from "axios";
import { CATEGORIES_URL } from "../../../../../constants/End_Points";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DeleteConfirmation from "../../../Shared/components/DeleteConfirmation/DeleteConfirmation";
import { toast } from "react-toastify";
import NoData from "../../../Shared/components/NoData/NoData";
import TitelsPages from "../../../Shared/components/TitelsPages/TitelsPages";

export default function CategoriesList() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [show, setShow] = useState(false);
  const [catId, setCatId] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setCatId(id);
    setShow(true);
  };
  let deleteCategory = async () => {
    try {
      let response = await axios.delete(CATEGORIES_URL.delete(catId), {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Deleted Successfully");
      getCategoriesList();
      handleClose();
    } catch (error) {
      toast.error('Failed Delete')
    }
  };
  let getCategoriesList = async () => {
    try {
      let response = await axios.get(CATEGORIES_URL.getList, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCategoriesList(response.data.data);
      console.log(response.data.data);
    } catch (error) {
     
    }
  };

  useEffect(() => {
    getCategoriesList();
  }, []);
  return (
    <div className="category">
      <Header
        imgUrl={RecipesImg}
        title={"Category"}
        title2={"Item"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      />

      <TitelsPages TitleHead={"Category"} button={"Category"} />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className=" mx-3">
          <DeleteConfirmation deleteItem={"Category"}></DeleteConfirmation>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteCategory}>
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="table-container m-4 py-2 ">
        <table className="table">
          <thead className=" table-secondary ps-3 ">
            <tr className=" ">
              <th className="th-first py-4 ps-5 " scope="col">
                #
              </th>
              <th className="py-4" scope="col">
                Name
              </th>
              <th className="py-4" scope="col">
                Cration Date
              </th>
              <th className="th-last py-4 pe-2" scope="col"></th>
            </tr>
          </thead>
          <tbody className="">
            {categoriesList.length > 0 ? (
              categoriesList.map((category) => (
                <tr key={category.id} >
                  <td scope="row" className="ps-5 ">{category.id}</td>
                  <td>{category.name}</td>
                  <td>{category.creationDate}</td>
                  <td className="tabledDrop pe-2">
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
                            onClick={() => handleShow(category.id)}
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
