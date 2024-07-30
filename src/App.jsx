
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './assets/modules/Shared/components/AuthLayout/AuthLayout'
import Login from './assets/modules/Authentication/components/Login/Login'
import Register from './assets/modules/Authentication/components/Register/Register'
import ResetPass from './assets/modules/Authentication/components/ResetPass/ResetPass'
import ForgetPass from './assets/modules/Authentication/components/ForgetPass/ForgetPass'
import MasterLayout from './assets/modules/Shared/components/MasterLayout/MasterLayout'
import Home from './assets/modules/Home/components/Home/Home'
import CategoriesList from './assets/modules/Categories/components/CategoriesList/CategoriesList'
import RecipesList from './assets/modules/Recipes/components/RecipesList/RecipesList'
import UsersList from './assets/modules/Users/components/UsersList/UsersList'
import NotFound from './assets/modules/Shared/components/NotFound/NotFound'
import { ToastContainer } from 'react-toastify'
 function App() {
 const routers =createBrowserRouter([
  {
    path:"",
    element:<AuthLayout/>,
    errorElement:<NotFound/>,
    children:[
     {index:true,element:<Login/>},
     {path:"login", element: <Login/>},
     {path:"register", element: <Register/>},
     {path:"forgetpassword", element: <ForgetPass/>},
     {path:"resetpassword", element: <ResetPass/>},
    ],



  },
  {
    path:'dashboard',
    element:<MasterLayout/>,
    errorElement:<NotFound/>,
    children:[
     {index:true,element:<Home/>},
     {path:"home", element: <Home/>},
     {path:"users", element: <UsersList/>},
     {path:"categoriesList", element: <CategoriesList/>},
     {path:"recipesList", element: <RecipesList/>},
    ],



  },
 ])

  return (
    <>

<ToastContainer />
<RouterProvider router={routers}/>
    </>

  )
}
export default App;
