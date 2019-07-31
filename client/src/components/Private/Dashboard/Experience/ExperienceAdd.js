import React, { useState } from "react";
import { connect } from "react-redux";
import { addExperience } from "../../../../actions/profile";
import { Link, withRouter } from "react-router-dom";
import Input from "../../../Common/Input";

const AddExperience = ({ errors, addExperience, history }) => {
  const { error } = errors;
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: ""
  });

  const [toDateDisabled, toggleDisabled] = useState(false);
  const { company, title, location, from, to, current, description } = formData;
  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <div className="ProfileNew">
      <h1>Add An Experience</h1>
      <p>
        Add any developer/programming positions that you have had in the past
      </p>
      <small>* = required field</small>
      <div className="ProfileNew-container">
        <div className="main-div">
          <form
            className="ProfileNew-form"
            onSubmit={e => {
              e.preventDefault();
              addExperience(formData, history);
            }}
          >
            <label>* Job Title</label>
            <Input
              placeholder="* Job Title"
              name="title"
              type="text"
              value={title}
              onChange={handleChange}
              error={error.title}
              error_fixed
            />
            <label>* Company</label>
            <Input
              placeholder="* Company"
              name="company"
              type="text"
              value={company}
              onChange={handleChange}
              error={error.company}
              error_fixed
            />
            <label>Location</label>
            <Input
              placeholder="Location"
              name="location"
              type="text"
              value={location}
              onChange={handleChange}
              error={error.location}
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
                <small>Current Job</small>
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
                placeholder="Job Description"
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
  { addExperience }
)(withRouter(AddExperience));
