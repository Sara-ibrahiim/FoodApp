import React from 'react'
import Header from '../../../Shared/components/Header/Header'
import HeaderImg from '../../../../assets/homegirl.svg'
import RecipesFile from '../../../Shared/components/RecipesFile/RecipesFile'

export default function Home() {

  return (
     <>

     <Header imgUrl={HeaderImg} 
     title={"Welcome"} 
     title2={"Food Recipes!"} 
     description={"This is a welcoming screen for the entry of the application , you can now see the options"}
     />


     <RecipesFile title={"Fill"}/>
  
     </>
  )
}
