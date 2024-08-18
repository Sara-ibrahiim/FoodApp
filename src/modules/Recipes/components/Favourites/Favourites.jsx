import React, { useEffect, useState } from 'react'
import Header from '../../../Shared/components/Header/Header'
import FAVImg from "../../../../assets/reciptes.svg";
import axios from 'axios';
import { Base_Img_Url, UserRecipe_URL } from '../../../../constants/End_Points';
import NoData from '../../../Shared/components/NoData/NoData';
import { toast } from 'react-toastify';

export default function Favourites() {
 const [favList, setFavList] = useState([])
   
    let getFavList = async () =>{
        try {
            let response = await axios.get(UserRecipe_URL.getList,{
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            setFavList(response.data.data)
        } catch (error) {
            console.log(response)
        }

    }
    let removeFav = async (id) =>{
     
             try {
            let response = await axios.delete(UserRecipe_URL.removeFav(id),{
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            toast.success("Item Successfully Removed")
            getFavList()
        } catch (error) {
            console.log(response)
        }

    }
    useEffect(() => {
        getFavList()
    }, [])
    
  return (
    <div>
        <Header title={"Favourites"} title2={"Items!"} 
        description={"You can now add your items that any user can order it from the Application and you can edit"}
        imgUrl={FAVImg}/>


{favList.length>0 ? <div className="container mx-3 my-5 ">
    <div className="row">
        {favList.map(fav=>  <div  key={fav.id} className="col-md-4">
            <div className='text-black shadow rounded-4 w-100'>
            <img src={`${Base_Img_Url}/${fav.recipe.imagePath}`}alt="" className='w-75' />
           <div className='p-3'>
           <h3>{fav.recipe.name}
            
            </h3>
            <p>{fav.recipe.description}</p>
            <i className="fa-solid fa-trash-can text-danger" onClick={()=> removeFav(fav.id)}></i>
           </div>

    </div>
       </div>)}
     
    </div>
    
    </div> : <NoData />}

   
      
    </div>


  )
}
