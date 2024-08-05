export const EmailValidation ={
        required:"Email is required",
        pattern:{
          value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message:"Email should be valid mail"
    
        },
}
const PasswordRegEx= 
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$ !%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

export const PasswordValidation={
    required:"password is required",
    pattern:{
      value:PasswordRegEx,
      message:"password  should be valid password "

    },

}