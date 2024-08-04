export const EmailValidation ={
        required:"Email is required",
        pattern:{
          value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message:"Email should be valid mail"
    
        },
}

export const PasswordValidation={
    required:"password is required",
    pattern:{
      value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[{\]};:'",/?]).{8,}$/,
      message:"password  should be valid password "

    },

}