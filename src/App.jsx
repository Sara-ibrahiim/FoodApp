import "./App.css";
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./modules/Shared/components/AuthLayout/AuthLayout";
import Login from "./modules/Authentication/components/Login/Login";
import Register from "./modules/Authentication/components/Register/Register";
import ResetPass from "./modules/Authentication/components/ResetPass/ResetPass";
import ForgetPass from "./modules/Authentication/components/ForgetPass/ForgetPass";
import MasterLayout from "./modules/Shared/components/MasterLayout/MasterLayout";
import Home from "./modules/Home/components/Home/Home";
import CategoriesList from "./modules/Categories/components/CategoriesList/CategoriesList";
import RecipesList from "./modules/Recipes/components/RecipesList/RecipesList";
import UsersList from "./modules/Users/components/UsersList/UsersList";
import NotFound from "./modules/Shared/components/NotFound/NotFound";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./modules/Shared/components/ProtectedRoute/ProtectedRoute";
import RecipesData from "./modules/Recipes/components/RecipesData/RecipesData";
import VerifyAccount from "./modules/Authentication/components/VerifyAccount/VerifyAccount";
import Favourites from "./modules/Recipes/components/Favourites/Favourites";


function App() {


  const routers = createHashRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login/> },
        { path: "login", element: <Login/> },
        { path: "register", element: <Register /> },
        { path: "forget-password", element: <ForgetPass /> }, 
        { path: "reset-password", element: <ResetPass /> },
        { path: "verify-account", element: <VerifyAccount /> },
      
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoute>
          <MasterLayout/>
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "users", element: <UsersList /> },
        { path: "categoriesList", element: <CategoriesList /> },
        { path: "recipesList", element: <RecipesList /> },
        { path: "recipes-data", element: <RecipesData /> },
        { path: "recipes-Edit/:id", element: <RecipesData /> },
        { path: "favourites", element: <Favourites /> },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer position="bottom-left" />
      <RouterProvider router={routers} />
    </>
  );
}
export default App;
