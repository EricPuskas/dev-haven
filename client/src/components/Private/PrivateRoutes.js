// Dependencies
import React from "react";
import { Switch } from "react-router-dom";
// Components
import PrivateRoute from "../Common/PrivateRoute";
import Dashboard from "./Dashboard/Dashboard";
import NotFound from "../Common/NotFound";
import ProfileNew from "./Dashboard/Profile/ProfileNew";
import ProfileEdit from "./Dashboard/Profile/ProfileEdit";
import ExperienceAdd from "./Dashboard/Experience/ExperienceAdd";
import EducationAdd from "./Dashboard/Education/EducationAdd";
import Posts from "./Feed/Posts";
import Post from "./Feed/Post";

const PrivateRoutes = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute
        exact
        path="/dashboard/profile/new"
        component={ProfileNew}
      />
      <PrivateRoute exact path="/dashboard/profile" component={ProfileEdit} />
      <PrivateRoute
        exact
        path="/dashboard/experience/new"
        component={ExperienceAdd}
      />
      <PrivateRoute
        exact
        path="/dashboard/education/new"
        component={EducationAdd}
      />
      <PrivateRoute exact path="/dashboard/feed" component={Posts} />
      <PrivateRoute exact path="/dashboard/feed/:id" component={Post} />
      <PrivateRoute component={NotFound} />
    </Switch>
  );
};

export default PrivateRoutes;
