const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validatePostsInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (Validator.isEmpty(data.text)) {
    errors.text = "Post can't be empty.";
  }

  if (!Validator.isLength(data.text, { min: 15, max: 500 })) {
    errors.text = "Content must be between 15 and 500 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
