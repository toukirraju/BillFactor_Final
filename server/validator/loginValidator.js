// const validator = require('validator');

const validate = (user) => {
  let error = {};

  if (!user.phone) {
    error.phone = "Please Provide your Phone Or ID";
  }

  if (!user.password) {
    error.password = "Please Provide a password";
  } else if (user.password < 4) {
    error.password = "Password must be greater then 4 digits";
  }

  return {
    error,
    isValid: Object.keys(error).length === 0,
  };
};

module.exports = validate;
