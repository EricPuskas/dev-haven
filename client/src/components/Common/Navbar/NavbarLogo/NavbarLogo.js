import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import debounce from "../../../../utils/debounce";
import "./NavbarLogo.css";

const NavbarLogo = () => {
  // eslint-disable-next-line
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    let debouncedHandleResize;
    debouncedHandleResize = debounce(function handleResize() {
      setWidth(window.innerWidth);
    }, 300);
    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  });
  let logo;
  if (window.innerWidth < 1024) {
    logo = (
      <img
        src="https://res.cloudinary.com/zenipsstudio/image/upload/v1564402710/dev-haven-logo-sm.png"
        className="NavbarLogo-img-sm"
        alt="Logo"
      />
    );
  } else {
    logo = (
      <img
        src="https://res.cloudinary.com/zenipsstudio/image/upload/v1564402815/dev-haven-logo.png"
        className="NavbarLogo-img"
        alt="Logo"
      />
    );
  }
  return (
    <div className="NavbarLogo">
      <Link to="/">{logo}</Link>
    </div>
  );
};

export default NavbarLogo;
