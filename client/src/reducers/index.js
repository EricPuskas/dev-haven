import { combineReducers } from "redux";
import errors from "./errors";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import post from "./post";

export default combineReducers({
  auth,
  alert,
  profile,
  post,
  errors
});
