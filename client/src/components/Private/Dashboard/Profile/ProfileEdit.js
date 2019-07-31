import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "../../../../actions/profile";
import { getCurrentProfile } from "../../../../actions/auth";
import { Link, withRouter } from "react-router-dom";
import Input from "../../../Common/Input";
import Select from "../../../Common/Select";
import statusArray from "../../../../utils/status";

const ProfileEdit = ({
  auth: { user },
  profile: { loading },
  createProfile,
  getCurrentProfile,
  history,
  errors
}) => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: ""
  });
  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  const { error } = errors;
  useEffect(() => {
    getCurrentProfile();
    setFormData({
      company: loading || !user.company ? "" : user.company,
      website: loading || !user.website ? "" : user.website,
      location: loading || !user.location ? "" : user.location,
      status: loading || !user.status ? "" : user.status,
      skills: loading || !user.skills ? "" : user.skills.join(","),
      githubusername:
        loading || !user.githubusername ? "" : user.githubusername,
      bio: loading || !user.bio ? "" : user.bio,
      twitter: loading || !user.social ? "" : user.social.twitter,
      facebook: loading || !user.social ? "" : user.social.facebook,
      linkedin: loading || !user.social ? "" : user.social.linkedin,
      youtube: loading || !user.social ? "" : user.social.youtube,
      instagram: loading || !user.social ? "" : user.social.instagram
    }); // eslint-disable-next-line
  }, [getCurrentProfile]);

  const handleChange = e =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  const handleSubmit = e => {
    console.log(formData);
    e.preventDefault();
    createProfile(formData, history, true);
  };
  return (
    <div className="ProfileNew">
      <h1> Create your profile!</h1>
      <p> Let's get some information to make your profile stand out </p>
      <small>* = required field</small>
      <div className="ProfileNew-container">
        <div className="main-div">
          <form className="ProfileNew-form" onSubmit={handleSubmit}>
            <Select
              name="status"
              onChange={handleChange}
              icon="fas fa-building"
              defaultValue={user.status}
              options={statusArray}
              error={error.status}
              error_fixed
            />
            <small className="form-text">
              Give us an idea of where you are at in your career
            </small>
            <Input
              placeholder="Company"
              name="company"
              icon="fas fa-building"
              type="text"
              value={company}
              onChange={handleChange}
              error={error.company}
              error_fixed
              mb={0}
            />
            <small className="form-text">
              Could be your own company or one you work for
            </small>
            <Input
              placeholder="Location"
              name="location"
              icon="fas fa-map-marker-alt"
              type="text"
              value={location}
              onChange={handleChange}
              error={error.location}
              error_fixed
              mb={0}
            />
            <small className="form-text">
              City & state suggested (eg. Boston, MA)
            </small>
            <Input
              placeholder="* Skills"
              name="skills"
              icon="far fa-check-circle"
              type="text"
              value={skills}
              onChange={handleChange}
              error={error.skills}
              error_fixed
              mb={0}
            />
            <small className="form-text">
              Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
            </small>
            <Input
              placeholder="Github Username"
              name="githubusername"
              icon="fab fa-github"
              type="text"
              value={githubusername}
              onChange={handleChange}
              error={error.githubusername}
              error_fixed
              mb={0}
            />
            <small className="form-text">
              If you want your latest repos and a Github link, include your
              username
            </small>
            <div className="form-group">
              <textarea
                placeholder="A short bio of yourself"
                value={bio}
                maxLength={500}
                rows={5}
                onChange={handleChange}
                name="bio"
                style={{ width: "100%" }}
              />
              <small className="form-text">
                Tell us a little about yourself{" "}
                {`( ${500 - bio.length} characters left. )`}
              </small>
            </div>
            <div className="my-2">
              <button
                onClick={() => toggleSocialInputs(!displaySocialInputs)}
                type="button"
                className="btn btn-standard"
              >
                Add Social Network Links
              </button>
              <span className="ProfileNew-optional">Optional</span>
            </div>
            {displaySocialInputs && (
              <div className="ProfileNew-social-inputs">
                <Input
                  placeholder="Twitter URL"
                  name="twitter"
                  icon="fab fa-twitter"
                  type="text"
                  value={twitter}
                  onChange={handleChange}
                  error={error.twitter}
                  error_fixed
                />
                <Input
                  placeholder="Facebook URL"
                  name="facebook"
                  icon="fab fa-facebook"
                  type="text"
                  value={facebook}
                  onChange={handleChange}
                  error={error.facebook}
                  error_fixed
                />
                <Input
                  placeholder="Youtube URL"
                  name="youtube"
                  icon="fab fa-youtube"
                  type="text"
                  value={youtube}
                  onChange={handleChange}
                  error={error.youtube}
                  error_fixed
                />
                <Input
                  placeholder="Linkedin URL"
                  name="linkedin"
                  icon="fab fa-linkedin"
                  type="text"
                  value={linkedin}
                  onChange={handleChange}
                  error={error.linkedin}
                  error_fixed
                />
                <Input
                  placeholder="Instagram URL"
                  name="instagram"
                  icon="fab fa-instagram"
                  type="text"
                  value={instagram}
                  onChange={handleChange}
                  error={error.instagram}
                  error_fixed
                />
              </div>
            )}
            <div className="ProfileNew-controls">
              <button
                type="submit"
                className="btn btn-standard btn-submit"
                id="ProfileNew-submit-btn"
              >
                {loading ? "Loading..." : "Save"}
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
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(ProfileEdit));
