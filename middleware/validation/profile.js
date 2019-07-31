const Validator = require("validator");
const isEmpty = require("./isEmpty");

exports.validateProfile = data => {
  let errors = {};
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (
    Validator.isEmpty(data.status) ||
    data.status === "* Select Professional Status"
  ) {
    errors.status = "Status is required.";
  }

  if (Validator.isEmpty(data.skills)) {
    errors.skills = "Skills is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

exports.validateExp = data => {
  let errors = {};
  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title is required.";
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = "Company is required.";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "From date is required.";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

exports.validateEdu = data => {
  let errors = {};
  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : "";

  if (Validator.isEmpty(data.school)) {
    errors.school = "School is required.";
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = "Degree is required.";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "From date is required.";
  }

  if (Validator.isEmpty(data.fieldOfStudy)) {
    errors.fieldOfStudy = "Field of study is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = exports;
