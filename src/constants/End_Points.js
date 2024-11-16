const Base_Url = "https://upskilling-egypt.com:3006/api/v1";
export const Base_Img_Url ="https://upskilling-egypt.com:3006/"



const Base_Users= `${Base_Url}/Users`;

export const User_URls ={
    login : `${Base_Users}/Login`,
    register : `${Base_Users}/Register`,
    delete: (id) =>  `${Base_Users}/${id}`,
    resetRequest: `${Base_Users}/Reset/Request`,
    reset: `${Base_Users}/Reset`,
    getList : `${Base_Users}`,  
    verify : `${Base_Users}/verify`,
    ChangePassword : `${Base_Users}/ChangePassword`,
}

//Categories Url
const BASE_CATEGORY=`${Base_Url}/Category`

export const CATEGORIES_URL ={
    getList : `${BASE_CATEGORY}`,  
    delete: (id) =>  `${BASE_CATEGORY}/${id}`,
    create : `${BASE_CATEGORY}`, 
    update: (id) =>  `${BASE_CATEGORY}/${id}`,
}
//Recipe url
const BASE_Recipe=`${Base_Url}/Recipe`

export const Recipe_URL ={
    getList : `${BASE_Recipe}`,  
    delete: (id) =>  `${BASE_Recipe}/${id}`,
    create : `${BASE_Recipe}`, 
    update: (id) => `${BASE_Recipe}/${id}`,
}

//url userRecipe

const BASE_UserRecipe=`${Base_Url}/userRecipe`

export const UserRecipe_URL ={
    getList : `${BASE_UserRecipe}`,  
    removeFav: (id) => `${BASE_UserRecipe}/${id}`,
    addToFav : `${BASE_UserRecipe}`, 

}



export const GetAllTags = `${Base_Url}/tag`