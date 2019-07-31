import React, { memo } from "react";
// Components
import NavbarLogo from "../NavbarLogo/NavbarLogo";
import ToggleButton from "../ToggleButton/ToggleButton";
import NavbarItems from "../NavbarItems/NavbarItems";
import "./TopNav.css";

const TopNav = ({ isAuthenticated, logout, toggleNav }) => {
  return (
    <header className="TopNav-toolbar">
      <nav className="TopNav-toolbar-nav">
        <NavbarLogo />
        <ToggleButton toggleNav={toggleNav} />
        <NavbarItems logout={logout} isAuthenticated={isAuthenticated} />
      </nav>
    </header>
  );
};

export default memo(TopNav);
