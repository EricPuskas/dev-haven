import React, { useEffect } from "react";
import { connect } from "react-redux";
import Loader from "../../../assets/img/rolling.svg";
import { getProfiles } from "../../../actions/profile";
import Developer from "./Developer";
import "./Developers.css";

const Developers = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  return (
    <div className="Developers">
      {loading ? (
        <div className="Developers-loader-container">
          <img src={Loader} alt="Loading..." className="Developers-loader" />
        </div>
      ) : (
        <>
          <h1>Developers</h1>
          <p>Browse and connect with Developers</p>
          <div className="Developers-list">
            {profiles.length > 0 ? (
              profiles.map(profile => (
                <Developer key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found</h4>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Developers);
