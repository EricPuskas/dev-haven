import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import filterOptions from "../../utils/filterOptions";

const Select = ({
  name,
  defaultValue,
  disabled,
  options,
  error,
  error_fixed,
  onChange,
  profileFormGroup,
  large
}) => {
  // let filteredOptions;
  // if (options && defaultValue) {
  //   filteredOptions = filterOptions(options, defaultValue);
  // }
  return (
    <div className="form-group">
      <select
        disabled={disabled}
        onChange={onChange}
        className={classnames("form-control", {
          "is-invalid": error,
          "profile-form-group": profileFormGroup,
          "form-control-lg": large
        })}
        name={name}
      >
        <option key={123123} defaultValue value={defaultValue}>
          {defaultValue}
        </option>
        {options}
      </select>
      {error && <div className={`errorMsg`}>{error}</div>}
    </div>
  );
};

export default Select;
