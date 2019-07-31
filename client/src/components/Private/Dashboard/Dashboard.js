import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../../actions/auth";
import {
  deleteEducation,
  deleteExperience,
  deleteAccount
} from "../../../actions/profile";
import Loader from "../../../assets/img/rolling.svg";
import Experience from "./Experience/Experience";
import Education from "./Education/Education";
import "./Dashboard.css";

const Dashboard = ({
  deleteEducation,
  deleteAccount,
  deleteExperience,
  auth,
  errors,
  getCurrentProfile
}) => {
  const { user, master_loader } = auth;
  const { error } = errors;
  let firstName = null;
  if (user && user.user) {
    firstName = user.user.name.split(" ", 1)[0];
  }
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  let content = null;
  let controls = null;
  if (user && !user.status && !master_loader) {
    controls = (
      <Link to="/dashboard/profile/new" id="create-profile">
        Create your profile
      </Link>
    );
  } else if (user.status) {
    controls = (
      <>
        <Link to="/dashboard/profile" id="edit-profile">
          Edit Profile
        </Link>
        <Link to="/dashboard/experience/new" id="add-exp">
          Add Experience
        </Link>
        <Link to="/dashboard/education/new" id="add-edu">
          {" "}
          Add Education{" "}
        </Link>
      </>
    );
  }
  if (!error && !error.error_message) {
    if (user && user.experience && user.education && !master_loader) {
      content = (
        <>
          <div className="col-xl-6 col-12 pad0 flex-center-col">
            {user.experience.length > 0 && (
              <Experience
                experience={user.experience}
                deleteExperience={deleteExperience}
              />
            )}
          </div>
          <div className="col-xl-6 col-12 pad0 flex-center-col">
            {user.education.length > 0 && (
              <Education
                education={user.education}
                deleteEducation={deleteEducation}
              />
            )}
          </div>
        </>
      );
    } else {
      content = (
        <div className="Dashboard-loader-container">
          <img src={Loader} alt="Loading..." className="Dashboard-loader" />
        </div>
      );
    }
  }
  return (
    <div className="Dashboard">
      <div className="row ma0">
        <div className="col-12 pad0">
          {firstName ? <h1>Welcome {firstName}!</h1> : null}
          <div className="Dashboard-controllers flex-center-col">
            {controls}
          </div>
        </div>
        {content}
        <div className="col-12">
          <div className="Dashboard-delete-container">
            <button className="btn btn-standard" onClick={deleteAccount}>
              Delete Account
            </button>
          </div>
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
  { deleteEducation, deleteAccount, deleteExperience, getCurrentProfile }
)(Dashboard);
