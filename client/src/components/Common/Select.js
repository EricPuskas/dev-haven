import React from "react";
import classnames from "classnames";
const Select = ({
  name,
  defaultValue,
  disabled,
  options,
  error,
  onChange,
  profileFormGroup,
  large
}) => {
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
