import React from 'react'
import deleteGirl from '../../../../assets/images/girl-delete.png'
export default function NoData() {
  return (
    <div className='text-center mb-0 container'>
        <div className='Nodata w-50'>
        <img  src={deleteGirl} className='nodata_img'/>
      <h5 className=''>NoData !</h5>
      <span className='light_gray'>are you sure you want to delete this item ? <br/>
      if you are sure just click on delete it</span>
      <p className='light_gray'></p>
        </div>
       
    </div>
  )
}
