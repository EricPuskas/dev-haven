import React from "react";
import { connect } from "react-redux";
// Actions
import { logoutUser } from "../../../actions/auth";
// Hook
import useToggleState from "../../../hooks/useToggleState";
// Components
import TopNav from "./TopNav/TopNav";
import SideNav from "./SideNav/SideNav";

const PublicNav = ({ auth, logoutUser }) => {
  const [isOpen, toggleNav] = useToggleState(false);
  const { isAuthenticated } = auth;
  return (
    <>
      <TopNav
        toggleNav={toggleNav}
        isAuthenticated={isAuthenticated}
        logout={logoutUser}
      />
      <SideNav
        toggleNav={toggleNav}
        isOpen={isOpen}
        isAuthenticated={isAuthenticated}
      />
    </>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(PublicNav);
