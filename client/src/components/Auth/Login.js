import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import loader from "../../assets/img/rolling_white.svg";
import Input from "../Common/Input";
import useInputState from "../../hooks/useInputState";

const Login = ({ error, login, clearErrors, loading }) => {
  document.title = "DevHaven - Log in";

  const [email, setEmail] = useInputState("");
  const [password, setPassword] = useInputState("");

  const handleSubmit = e => {
    e.preventDefault();
    login({ email, password });
  };

  useEffect(() => {
    return () => {
      clearErrors();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="login-form">
      <h1> Sign in</h1>
      <div className="main-div">
        <form id="Login" onSubmit={handleSubmit} autoComplete="new-password">
          <label> Email </label>
          <Input
            placeholder="Email Address"
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
            error={error.password || error.error_message}
            error_fixed
          />
          {error && (
            <div className="invalid-feedback" style={{ textAlign: "center" }}>
              {error.invalid_auth}
            </div>
          )}
          <div className="login-btn-group">
            <button type="submit" className="btn btn-primary">
              {loading ? <img src={loader} alt="Loading..." /> : "Login"}
            </button>
          </div>
          <div style={{ margin: "1rem" }}>
            <Link to="/register"> Don't have an account? </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
