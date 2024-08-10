const Base_Url = "https://upskilling-egypt.com:3006/api/v1";
export const Base_Img_Url ="https://upskilling-egypt.com:3006/"



const Base_Users= `${Base_Url}/Users`;

export const User_URls ={
    login : `${Base_Users}/Login`,
    register : `${Base_Users}/Register`,
    delete: (id) =>  `${Base_Users}/${id}`,
    resetRequest: `${Base_Users}/Reset/Request`,
    reset: `${Base_Users}/Reset`,

}

//Categories Url
const BASE_CATEGORY=`${Base_Url}/Category`

export const CATEGORIES_URL ={
    getList : `${BASE_CATEGORY}`,  
    delete: (id) =>  `${BASE_CATEGORY}/${id}`,

}
//Recipe url
const BASE_Recipe=`${Base_Url}/Recipe`

export const Recipe_URL ={
    getList : `${BASE_Recipe}`,  
    delete: (id) =>  `${BASE_Recipe}/${id}`,

}

//url userRecipe

const BASE_UserR=`${Base_Url}/userRecipe`

export const UserRecipe_URL ={
    getList : `${BASE_UserR}`,  
    delete: (id) => `${BASE_UserR}/${id}`,

}