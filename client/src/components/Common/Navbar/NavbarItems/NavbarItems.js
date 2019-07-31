import React from "react";
import { NavLink } from "react-router-dom";
import "./NavbarItems.css";

const NavbarItems = ({ isAuthenticated, logout }) => {
  let navItems = (
    <ul>
      <li>
        <NavLink exact={true} activeClassName="is-active" to="/developers">
          Developers
        </NavLink>
      </li>
      <li>
        <NavLink
          exact={true}
          className="NavbarItems-login"
          activeClassName="is-active"
          to="/login"
        >
          Log in
        </NavLink>
      </li>
      <li>
        <NavLink
          exact={true}
          className="NavbarItems-signup"
          activeClassName="is-active"
          to="/register"
        >
          Sign up
        </NavLink>
      </li>
    </ul>
  );
  if (isAuthenticated) {
    navItems = (
      <ul>
        <li>
          <NavLink exact={true} activeClassName="is-active" to="/developers">
            Developers
          </NavLink>
        </li>
        <li>
          <NavLink
            exact={true}
            activeClassName="is-active"
            to="/dashboard/feed"
          >
            Feed
          </NavLink>
        </li>
        <li>
          <NavLink exact={true} activeClassName="is-active" to="/dashboard">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            exact={true}
            activeClassName="is-active"
            to="/"
            onClick={logout}
          >
            <i className="fas fa-sign-out-alt" />
            Logout
          </NavLink>
        </li>
      </ul>
    );
  }
  return <div className="NavbarItems">{navItems}</div>;
};

export default NavbarItems;
