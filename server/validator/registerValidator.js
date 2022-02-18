// const validator = require("validator");

const validate = (user) => {
  let error = {};

  if (!user.name) {
    error.name = "Please provide your name";
  }

  if (!user.phone) {
    error.phone = "Please provide your phone no";
  }

  if (!user.email) {
    error.email = "Please provide your email";
  }
  // else if (!validator.isph(user.email)) {
  //   error.email = "Please provide a valid email";
  // }

  if (!user.password) {
    error.password = "Please Provide a password";
  } else if (user.password < 4) {
    error.password = "Password must be greater then 4 digits";
  }

  if (!user.confirmPassword) {
    error.confirmPassword = "Please Provide a Confirm Password";
  } else if (user.password !== user.confirmPassword) {
    error.confirmPassword = "Confirm Password did not match";
  }

  return {
    error,
    isValid: Object.keys(error).length === 0,
  };
};

module.exports = validate;
