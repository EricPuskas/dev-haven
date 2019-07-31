import React, { memo } from "react";
import classnames from "classnames";

const Input = ({
  placeholder,
  value,
  name,
  type,
  error,
  icon,
  onChange,
  autoComplete,
  label,
  mb,
  error_fixed,
  disabled,
  checked
}) => {
  let inputClasses = classnames("form-control", {
    "is-invalid": error
  });

  let inputGroupText = classnames("input-group-text", {
    "is-invalid": error
  });
  let errorClasses = classnames("invalid-feedback", {
    fixed: error_fixed
  });

  return (
    <div className={`input-group mb-${mb}`}>
      {icon && (
        <div className="input-group-prepend">
          <span className={inputGroupText}>
            <i className={icon} />
          </span>
        </div>
      )}
      {label && <label> {label} </label>}
      {type !== "checkbox" ? (
        <input
          className={inputClasses}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={onChange}
          disabled={disabled}
          name={name}
          value={value ? value : ""}
          type={type}
          aria-label={name}
        />
      ) : (
        <input
          className={inputClasses}
          onChange={onChange}
          value={value ? value : ""}
          name={name}
          type={type}
          disabled={disabled}
          checked={checked ? checked : null}
        />
      )}
      {error && <div className={errorClasses}>{error}</div>}
    </div>
  );
};

Input.defaultProps = {
  type: "text",
  mb: 3
};

export default memo(Input);
