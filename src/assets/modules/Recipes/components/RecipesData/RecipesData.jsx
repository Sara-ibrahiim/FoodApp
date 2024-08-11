import React, { useEffect, useState } from "react";
import RecipesFile from "../../../Shared/components/RecipesFile/RecipesFile";
import axios from "axios";
import {
  CATEGORIES_URL,
  GetAllTags,
  Recipe_URL,
} from "../../../../../constants/End_Points";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function RecipesData() {
  let navigate = useNavigate();
  const [tagList, setTagList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  let {
    register,
    handleSubmit,
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
  let onSubmit = async (data) => {
    console.log(data);

    let recipeData = appendToFormData(data);

    try {
      let response = await axios.post(Recipe_URL.create, recipeData,
         { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log(response);
      navigate("/dashboard/recipesList");
      toast.success(response?.data?.message);
     
    } catch (error) {}
  };

  useEffect(() => {
    getAllTags();
    getCategoriesList();
  }, []);

  return (
    <div>
      <RecipesFile />

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
          />
          {errors.name && (
            <p className="text-danger my-3">{errors.name.message}</p>
          )}
          <select
            placeholder="Tag"
            className="form-control my-3"
            {...register("tagId", {
              required: "Tag is required",
            })}
          >
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
          />
          {errors.price && (
            <p className="text-danger my-3">{errors.price.message}</p>
          )}

          <select
            placeholder="Category"
            className="form-control my-3"
            {...register("categoriesIds", {
              required: "Category is required",
            })}
          >
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
            placeholder="Description"
            {...register("description", {
              required: "Description  Name is required",
            })}
          ></textarea>

          {errors.description && (
            <p className="text-danger my-3">{errors.description.message}</p>
          )}

          <input
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
          )}

          <div className="d-flex justify-content-end my-3">
            <button className="btn btn-outline-success mx-3 py-2 px-4 ">
              Cancel
            </button>
            <button className="btn btn-success px-3  " type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
