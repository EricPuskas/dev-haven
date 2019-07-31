const isLength = require("validator/lib/isLength");
const isEmpty = require("./isEmpty");

module.exports = function validatePostsInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (isEmpty(data.text)) {
    errors.text = "Comment can't be empty.";
  }

  if (!isLength(data.text, { min: 15, max: 250 })) {
    errors.text = "Content must be between 15 and 250 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
