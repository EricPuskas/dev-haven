import React from "react";
import { Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
// Actions
import { loginUser, registerUser, clearErrors } from "../../actions/auth";
import Login from "./Login";
import Register from "./Register";
import NotFound from "../Common/NotFound";
import Route from "../Common/Route"; // Route with props
import "./Auth.css";

const AuthRoutes = ({ loginUser, registerUser, clearErrors, auth, errors }) => {
  const { error } = errors;
  const { isAuthenticated, loading } = auth;

  if (isAuthenticated) {
    clearErrors();
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="auth-container">
      <Switch>
        <Route
          exact
          path="/login"
          error={error}
          login={loginUser}
          clearErrors={clearErrors}
          loading={loading}
          component={Login}
        />
        <Route
          exact
          path="/register"
          error={error}
          register={registerUser}
          clearErrors={clearErrors}
          loading={loading}
          component={Register}
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser, registerUser, clearErrors }
)(AuthRoutes);
