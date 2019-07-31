import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthRoutes from "../Auth/AuthRoutes";

// Components
import Landing from "./Landing/Landing";
import Developers from "./Developers/Developers";
import Profile from "./Developers/Profile/Profile";
import NotFound from "../Common/NotFound";

const PublicRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/developers" component={Developers} />
      <Route exact path="/developers/:id" component={Profile} />
      <Route path="/" component={AuthRoutes} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default PublicRoutes;
