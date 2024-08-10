import React from 'react'
import Header from '../../../Shared/components/Header/Header'
import HeaderImg from '../../../../homegirl.svg'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  let navigate= useNavigate();
  return (
     <>

     <Header imgUrl={HeaderImg} 
     title={"Welcome"} 
     title2={"Upskilling !"} 
     description={"This is a welcoming screen for the entry of the application , you can now see the options"}
     />

     <div className='Home-Title d-flex m-4 p-4 justify-content-between align-items-center rounded-4'>
      <div className=''>
        <h5>Fill the <span className='green'>Recipes</span> !</h5>
        <p>you can now fill the meals easily using the table and form ,  <br/>
        click here and sill it with the table !</p>
      </div>

      <button onClick={()=>navigate('/dashboard/recipesList')} 
      className='btn btn-success green-bg py-2 px-5'>Fill Recipes
        <i className="fa-solid fa-arrow-right ps-3 mt-2"></i> </button>

     </div>
   
  
     </>
  )
}
