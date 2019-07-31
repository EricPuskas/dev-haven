import React, { useState } from "react";
import { connect } from "react-redux";
import { addEducation } from "../../../../actions/profile";
import { Link, withRouter } from "react-router-dom";
import Input from "../../../Common/Input";

const AddEducation = ({ errors, addEducation, history }) => {
  const { error } = errors;
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldOfStudy: "",
    from: "",
    to: "",
    current: false,
    description: ""
  });

  const [toDateDisabled, toggleDisabled] = useState(false);
  const {
    school,
    degree,
    fieldOfStudy,
    from,
    to,
    current,
    description
  } = formData;
  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <div className="ProfileNew">
      <h1>Add Your Education</h1>
      <p>Add any school,certificate or bootcamp you have attended.</p>
      <small>* = required field</small>
      <div className="ProfileNew-container">
        <div className="main-div">
          <form
            className="ProfileNew-form"
            onSubmit={e => {
              e.preventDefault();
              addEducation(formData, history);
            }}
          >
            <label>* School or Bootcamp</label>
            <Input
              placeholder="* School or Bootcamp"
              name="school"
              type="text"
              value={school}
              onChange={handleChange}
              error={error.school}
              error_fixed
            />
            <label>* Company</label>
            <Input
              placeholder="* Degree or Certificate"
              name="degree"
              type="text"
              value={degree}
              onChange={handleChange}
              error={error.degree}
              error_fixed
            />
            <label>Field of Study</label>
            <Input
              placeholder="Field of Study"
              name="fieldOfStudy"
              type="text"
              value={fieldOfStudy}
              onChange={handleChange}
              error={error.fieldOfStudy}
              error_fixed
            />
            <label>From Date</label>
            <Input
              name="from"
              type="date"
              value={from}
              onChange={handleChange}
              error={error.from}
              error_fixed
            />
            <div className="form-group">
              <p>
                <input
                  type="checkbox"
                  name="current"
                  checked={current}
                  value={current}
                  onChange={e => {
                    setFormData({ ...formData, current: !current });
                    toggleDisabled(!toDateDisabled);
                  }}
                />{" "}
                <small>Current </small>
              </p>
            </div>
            <label>To Date</label>
            <Input
              name="to"
              type="date"
              disabled={toDateDisabled ? "disabled" : ""}
              value={to}
              onChange={handleChange}
              error={error.to}
              error_fixed
            />
            <div className="form-group">
              <textarea
                name="description"
                cols="30"
                rows="5"
                placeholder="Program Description"
                value={description}
                onChange={handleChange}
              />
            </div>
            <div className="ProfileNew-controls">
              <button
                type="submit"
                className="btn btn-standard btn-submit"
                id="ProfileNew-submit-btn"
              >
                Submit
              </button>
              <Link className="btn btn-standard btn-go-back" to="/dashboard">
                Go Back
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addEducation }
)(withRouter(AddEducation));
