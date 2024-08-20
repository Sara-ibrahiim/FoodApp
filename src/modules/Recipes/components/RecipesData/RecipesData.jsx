import React, { useContext, useEffect, useState } from "react";
import RecipesFile from "../../../Shared/components/RecipesFile/RecipesFile";
import { DropzoneArea } from "mui-file-dropzone";
import { useBeforeunload } from "react-beforeunload";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import {
  CATEGORIES_URL,
  GetAllTags,
  Recipe_URL,
  
} from "../../../../constants/End_Points";
import { AuthContext } from '../../../../context/AuthContext'
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useBlocker, useLocation, useNavigate } from "react-router-dom";
export default function RecipesData() {
  useBeforeunload((event) => {
    event.preventDefault();
    console.log("beforeunload happened!");
  });
  let { loginData } = useContext(AuthContext);
  let navigate = useNavigate();
  if (loginData?.userGroup != "SuperAdmin") {
      
    navigate("/NotFound")
  }
  // const {proceed,state,reset,Location} =useBlocker(({currentLocation,nextLocation})=>{
  //   return currentLocation !== nextLocation
   
  // });




 const [tagId, setTagId] = useState('')
 const [categoryId, setCategoryId] = useState([])

  const location= useLocation();
  const status = location.state?.type === "edit";
  const recipeData = location.state?.recipeData;

  const [tagList, setTagList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  let {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
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

  const appendToFormData = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("tagId", data.tagId);
    formData.append("categoriesIds", data.categoriesIds);
    formData.append("recipeImage", data.recipeImage[0]);

    return formData;
  };

// const RemoveData = ()=>{
//   setValue("name",null)
//   setValue("price",null)
//   setValue("description",null)
//   setValue("recipeImage",null)
// }

  let onSubmit = async (data) => {
    console.log(data);
    let recipeDataList = appendToFormData(data);

    try {
      let response = await axios({
        method: status ? 'put':'post',
        url: status ? `https://upskilling-egypt.com:3006/api/v1/Recipe/${recipeData.id}` : 
        Recipe_URL.create,
        data:recipeDataList,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })

      console.log(response);
     
     
      navigate("/dashboard/recipesList");
      toast.success(response?.data?.message);
     
    } catch (error) {}
  };

//   useEffect(() => {
// const beforeunload = (e)=>{
//   localStorage.setItem("recipe-data",JSON.stringify(getValues()))
// //e.preventDefault();
// } 
// window.addEventListener("beforeunload",beforeunload)
// return()=>{
//  window.removeEventListener("beforeunload",beforeunload)
// }
//   }, []);

useEffect(() => {
  if(status && recipeData){
      setTagId(recipeData.tag.id)
      setCategoryId(recipeData.category[0]?.id)
  }
      
    getAllTags();
    getCategoriesList();

  // const getTagAndCategory = async ()=>{
  //   if(status && recipeData){
  //     setTagId(recipeData.tag.id)
  //     setCategoryId(recipeData.category[0]?.id)
  //      }
      
  // await  getAllTags();
  // await  getCategoriesList();

  //  const storedData= JSON.parse(localStorage.getItem("recipe-data"))
  //   reset(storedData)
  // }

  // getTagAndCategory()
}, [])



  return (
    <>

{/*{state == "blocked" && (<div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
        
        </Modal.Header>

        <Modal.Body className="text-center">
        <h3 className="mb-2">Are you Sure <i className="fa-solid fa-circle-exclamation  ms-2 text-warning"></i></h3>
        <p>You Have Unsaved Data</p>
        </Modal.Body>

        <Modal.Footer className="mt-5">
  <Button className="green-bg" variant="outline-warring" type="submit" 
  
    onClick={()=>{
      proceed()
    }}>
     Ok
     
    </Button>
    <Button className="green-bg" variant="success" type="submit" 
  
  onClick={()=>{
    reset()
  }}>
   Cancel
  </Button>
  </Modal.Footer>

      </Modal.Dialog>
    </div>)}
 */}

{loginData?.userGroup == "SuperAdmin"? 
 <div>
 <RecipesFile title={"All"}/>

 <div className=" px-4 my-5 pt-3">
   <form
    
     className="w-75 m-auto"
     onSubmit={handleSubmit(onSubmit)}
   >
     <input
       type="text"
       className="form-control my-3"
       placeholder="Recipe Name"
       aria-label="name"
       aria-describedby="basic-addon1"
       {...register("name", {
         required: "Recipe Name is required",
       })}
       defaultValue={status?recipeData.name:""}
     />
     {errors.name && (
       <p className="text-danger my-3">{errors.name.message}</p>
     )}


     <select
       placeholder="Tag"
       className="form-control my-3 select-gray"
       {...register("tagId", {
         required: "Tag is required",
       })}
       value={tagId}
       onChange={(e)=>setTagId(e.target.value)}
     >
       <option value="">Tag</option>
       {tagList.map((tag) => (
         <option key={tag.id} value={tag.id}>
           {tag.name}
         </option>
       ))}
    
     </select>
     {errors.tagId && (
       <p className="text-danger my-3">{errors.tagId.message}</p>
     )}



     
     <input
       type="text"
       className="form-control my-2"
       placeholder="Price"
       aria-label="price"
       aria-describedby="basic-addon1"
       {...register("price", {
         required: "Price is required",
       })}
       defaultValue={status?recipeData.price:""}
     />
     {errors.price && (
       <p className="text-danger my-3">{errors.price.message}</p>
     )}

     <select
       placeholder="Category"
       className="form-control my-3 select-gray"
       {...register("categoriesIds", {
         required: "Category is required",
       })}
       value={categoryId}
       onChange={(e)=>setCategoryId(e.target.value)}
     >
       <option value="">Category</option>
       {categoriesList.map((category) => (
         <option key={category.id} value={category.id}>
           {category.name}
         </option>
       ))}
     </select>
     {errors.categoriesIds && (
       <p className="text-danger my-3">{errors.categoriesIds.message}</p>
     )}

     <textarea
       className="form-control my-3"
       rows={4}
       placeholder="Description"
       {...register("description", {
         required: "Description  Name is required",
       })}
       defaultValue={status?recipeData.description:""}
     ></textarea>

     {errors.description && (
       <p className="text-danger my-3">{errors.description.message}</p>
     )}

     {/* <input
       type="file"
       className="form-control my-2"
       placeholder="Upload Image"
       aria-label="recipeImage"
       aria-describedby="basic-addon1"
       {...register("recipeImage", {
         required: "recipeImage Name is required",
       })}
     />
     {errors.recipeImage && (
       <p className="text-danger my-3">{errors.recipeImage.message}</p>
     )} */}

     
     <Controller
           name="recipeImage"
           rules={{ required: 'recipe Image is required'}}
           control={control}
           render={({ field }) => (
               <DropzoneArea
                   acceptedFiles={['image/*']}
                   dropzoneText="Drag & Drop or Choose an Item Image to Upload"
                   filesLimit={1}
                   onChange={(files) => {
                       // console.log('Files:', files);
                       field.onChange(files);
                   }}
               />
           )}
   /> 

     <div className="d-flex justify-content-end my-3">
       <button  className="btn btn-outline-success mx-3 py-2 px-4 " type="button"
       onClick={()=>{
        navigate(-1)
      //  localStorage.removeItem("recipe-data")
       }}>
         Cancel
       </button>
       <button className="btn btn-success px-3 green-bg " type="submit" >Save
        {/* {status === "edit" ? 'Update' : ' Save'} */}
       </button>
     </div>
   </form>
 </div>
</div>
: ""}
   
    </>
  );
}
