import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import loader from "../../assets/img/rolling.svg";
import Input from "../Common/Input";
import useInputState from "../../hooks/useInputState";

const Register = ({ error, register, clearErrors, loading }) => {
  document.title = "DevHaven - Sign up";

  const [name, setName] = useInputState("");
  const [email, setEmail] = useInputState("");
  const [password, setPassword] = useInputState("");
  const [password_confirm, setPasswordConfirm] = useInputState("");

  const handleSubmit = e => {
    e.preventDefault();
    register({ name, email, password, password_confirm });
  };

  useEffect(() => {
    return () => {
      clearErrors();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="login-form">
      <h1> Sign up</h1>
      <div className="main-div">
        <form id="Login" onSubmit={handleSubmit} autoComplete="new-password">
          <label> Name </label>
          <Input
            placeholder="Your Name"
            name="name-input"
            type="name"
            value={name}
            icon="fas fa-id-badge"
            autoComplete="new-password"
            onChange={setName}
            error={error.name || error.error_message}
            error_fixed
          />
          <label> Email </label>
          <Input
            placeholder="Your Email Address"
            name="email-input"
            type="email"
            value={email}
            icon="far fa-envelope"
            autoComplete="new-password"
            onChange={setEmail}
            error={error.email || error.error_message}
            error_fixed
          />
          <label> Password </label>
          <Input
            placeholder="Password"
            name="password-input"
            icon="fas fa-lock"
            type="password"
            value={password}
            autoComplete="new-password"
            onChange={setPassword}
            error={error.password || error.error_message || error.invalid_auth}
            error_fixed
          />
          <label> Confirm Password </label>
          <Input
            placeholder="Confirm your password"
            name="password-confirm-input"
            icon="fas fa-user-check"
            type="password"
            value={password_confirm}
            autoComplete="new-password"
            onChange={setPasswordConfirm}
            error={
              error.password_confirm ||
              error.error_message ||
              error.invalid_auth
            }
            error_fixed
          />
          <div className="login-btn-group">
            <button type="submit" className="btn btn-primary">
              {loading ? <img src={loader} alt="Loading..." /> : "Register"}
            </button>
          </div>
          <div style={{ margin: "1rem" }}>
            <Link to="/login"> Already have an account? </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
