import React from 'react'
import dGirl from '../../../../assets/images/girl-delete.png'
export default function DeleteConfirmation({deleteItem}) {
  return (
    <div className=' '>
         <div className='text-center ms-3  '>
          <img  src={dGirl}/>
          <h5 className='py-2 fw-bold'>Delete This {deleteItem} ?</h5>
          <span className='delete-title'>are you sure you want to delete this item ?
             <br/> if you are sure just click on delete it</span>
    
          </div>

           
    </div>
  )
}

