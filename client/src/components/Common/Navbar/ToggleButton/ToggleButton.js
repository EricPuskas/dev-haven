import React from "react";
import "./ToggleButton.css";

const ToggleButton = ({ toggleNav }) => {
  return (
    <div className="ToggleButton">
      <button
        className="ToggleButton-btn"
        aria-label="toggle dropdown"
        onClick={() => toggleNav()}
      >
        <div className="ToggleButton-toggle-btn-line" />
        <div className="ToggleButton-toggle-btn-line" />
        <div className="ToggleButton-toggle-btn-line" />
      </button>
    </div>
  );
};

export default ToggleButton;
