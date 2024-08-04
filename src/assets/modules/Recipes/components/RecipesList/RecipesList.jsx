import React from 'react'
import Header from '../../../Shared/components/Header/Header'
import RecipesImg from '../../../../reciptes.svg'
export default function RecipesList() {
  return (
    <div>
         <Header imgUrl={RecipesImg} 
     title={"Recipes"}  
     title2={"Items"}
     description={"You can now add your items that any user can order it from the Application and you can edit"}
     />
    </div>
  )
}
