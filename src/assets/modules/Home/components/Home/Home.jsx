import React from 'react'
import Header from '../../../Shared/components/Header/Header'
import HeaderImg from '../../../../homegirl.svg'
export default function Home() {
  return (
     <>

     <Header imgUrl={HeaderImg} 
     title={"Welcome"} 
     title2={"Upskilling !"} 
     description={"This is a welcoming screen for the entry of the application , you can now see the options"}
     />
   
  
     </>
  )
}
