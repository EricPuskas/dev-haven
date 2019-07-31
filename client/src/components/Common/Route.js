import React from "react";
import { Route } from "react-router-dom";

const RouteWithProps = ({ component: Component, props, ...rest }) => (
  <Route {...rest} render={props => <Component {...props} {...rest} />} />
);

export default RouteWithProps;
