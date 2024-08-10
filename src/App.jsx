import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./assets/modules/Shared/components/AuthLayout/AuthLayout";
import Login from "./assets/modules/Authentication/components/Login/Login";
import Register from "./assets/modules/Authentication/components/Register/Register";
import ResetPass from "./assets/modules/Authentication/components/ResetPass/ResetPass";
import ForgetPass from "./assets/modules/Authentication/components/ForgetPass/ForgetPass";
import MasterLayout from "./assets/modules/Shared/components/MasterLayout/MasterLayout";
import Home from "./assets/modules/Home/components/Home/Home";
import CategoriesList from "./assets/modules/Categories/components/CategoriesList/CategoriesList";
import RecipesList from "./assets/modules/Recipes/components/RecipesList/RecipesList";
import UsersList from "./assets/modules/Users/components/UsersList/UsersList";
import NotFound from "./assets/modules/Shared/components/NotFound/NotFound";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./assets/modules/Shared/components/ProtectedRoute/ProtectedRoute";

function App() {
  const [loginData, setLoginData] = useState(null);

  let saveLoginData = () => {
    let encodedToken = localStorage.getItem("token");
    let decodedToken = jwtDecode(encodedToken);
    console.log(decodedToken);
    setLoginData(decodedToken);
    console.log(loginData?.userName);
  };

useEffect(()=>{
  if(localStorage.getItem("token"))
  {
    saveLoginData()
  }
},[])

  const routers = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login saveLoginData={saveLoginData} /> },
        { path: "login", element: <Login saveLoginData={saveLoginData} /> },
        { path: "register", element: <Register /> },
        { path: "forget-password", element: <ForgetPass /> }, 
        { path: "reset-password", element: <ResetPass /> },
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoute>
          <MasterLayout loginData={loginData} />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "users", element: <UsersList /> },
        { path: "categoriesList", element: <CategoriesList /> },
        { path: "recipesList", element: <RecipesList /> },
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
