import React from 'react'
import Header from '../../../Shared/components/Header/Header'
import RecipesImg from '../../../../reciptes.svg'
export default function UsersList() {
  return (
    <div>
    <Header imgUrl={RecipesImg} 
title={"Users"}  
title2={"List"}
description={"You can now add your items that any user can order it from the Application and you can edit"}
/>
</div>
  )
}
