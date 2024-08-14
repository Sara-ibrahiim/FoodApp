import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function RecipesFile() {
    let navigate= useNavigate();
  return (
    <div>
           <div className='Home-Title d-flex m-4 p-4 justify-content-between align-items-center rounded-4 '>
      <div className='ps-4 ms-3 pt-3'>
        <h5 className=''>Fill the <span className='green'>Recipes</span> !</h5>
        <p className=''>you can now fill the meals easily using the table and form ,  <br/>
        click here and sill it with the table !</p>
      </div>

      <button onClick={()=>navigate('/dashboard/recipesList')} 
      className='btn btn-success green-bg py-2  px-5'>Fill Recipes
        <i className="fa-solid fa-arrow-right ps-3 mt-2"></i> </button>

     </div>
    </div>
  )
}
