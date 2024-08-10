import React from 'react'
import dGirl from '../../../../images/girl-delete.png'
export default function DeleteConfirmation({deleteItem}) {
  return (
    <div className=' '>
         <div className='text-center ms-5   '>
          <img  src={dGirl}/>
          <h5 className='py-3'>Delete This {deleteItem} ?</h5>
          <span className='light_gray'>are you sure you want to delete this item ?
             <br/> if you are sure just click on delete it</span>
    
          </div>

           
    </div>
  )
}

