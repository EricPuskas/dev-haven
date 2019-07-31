import React, { memo } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import "./SideNav.css";

const SideNav = ({ isOpen, toggleNav, isAuthenticated }) => {
  let sideDrawerClass = classNames({
    SideNav: true,
    open: isOpen
  });
  if (isAuthenticated) {
    return (
      <nav className={sideDrawerClass}>
        <div className="SideNav-scrollable">
          <ul>
            <li onClick={toggleNav}>
              <Link to="/developers">Developers</Link>
            </li>
            <li onClick={toggleNav}>
              <Link to="/developers">Feed</Link>
            </li>
            <li onClick={toggleNav}>
              <Link to="/developers">Dashboard</Link>
            </li>
            <li onClick={toggleNav}>
              <Link to="/developers">
                <i className="fas fa-sign-out-alt" /> Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className={sideDrawerClass}>
        <div className="SideNav-scrollable">
          <ul>
            <li onClick={toggleNav}>
              <Link to="/developers">Developers</Link>
            </li>
            <li onClick={toggleNav}>
              <Link to="/login" className="SideNav-login">
                Log in
              </Link>
            </li>
            <li onClick={toggleNav}>
              <Link to="/register" className="SideNav-signup">
                Sign up
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
};

export default memo(SideNav);
