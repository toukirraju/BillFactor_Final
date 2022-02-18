const validator = require("validator");

const validate = (user) => {
  let error = {};

  if (!user.name) {
    error.name = "Please Provide your name";
  }

  // if(!user.email){
  //     error.email = 'Please Provide your email'
  // }
  // else if(!validator.isEmail(user.email)){
  //     error.email='Please Provide a valid email'
  // }

  if (!user.phone) {
    error.name = "Please Provide your phone No";
  }

  // if(!user.password){
  //     error.password ='Please Provide a password'
  // }else if(user.password < 4 ){
  //     error.password ='Password must be greater then 4 digits'
  // }

  // if(!user.confirmPassword){
  //     error.confirmPassword ='Please Provide a Confirm Password'
  // }else if(user.password !== user.confirmPassword){
  //     error.confirmPassword ='Confirm Password did not match'
  // }

  return {
    error,
    isValid: Object.keys(error).length === 0,
  };
};

module.exports = validate;
