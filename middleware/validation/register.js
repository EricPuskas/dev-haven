const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password_confirm = !isEmpty(data.password_confirm)
    ? data.password_confirm
    : "";

  if (!Validator.isLength(data.name, { max: 255 })) {
    errors.name =
      "Unfortunately, we are unable to store names longer than 255 characters.";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required.";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required.";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email field is invalid.";
  }

  let lowerRegex = /[a-z]/;
  let upperRegex = /[A-Z]/;
  let numberRegex = /[0-9]/;
  let specialRegex = /[$@$!%*?&]/;

  if (!data.password.match(lowerRegex))
    errors.password = "Password must contain at least one lowercase letter.";
  if (!data.password.match(upperRegex))
    errors.password = "Password must contain at least one uppercase letter.";
  if (!data.password.match(numberRegex))
    errors.password = "Password must contain at least one number.";
  if (!data.password.match(specialRegex))
    errors.password = "Password must contain at least a special character";
  if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = "Password must be between 8 and 30 characters.";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required.";
  }

  if (Validator.isEmpty(data.password_confirm)) {
    errors.password_confirm = "You must confirm the password.";
  }

  if (!Validator.equals(data.password, data.password_confirm)) {
    errors.password_confirm = "Passwords must match.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
