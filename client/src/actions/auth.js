import setAuthToken from "../utils/setAuthToken";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_CURRENT_PROFILE,
  CLEAR_ERRORS,
  AUTH_LOADING,
  LOADING,
  STOP_LOADING,
  STOP_AUTH_LOADING
} from "./types";

// Register User
export const registerUser = userData => async dispatch => {
  try {
    dispatch(AuthLoading());
    let res = await axios.post("/api/auth/register", userData);
    if (res) {
      // Save to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set Token to Auth header
      setAuthToken(token);
      // Decode Token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    }
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
    dispatch(StopAuthLoading());
  }
};

// Login - Get user token
export const loginUser = userData => async dispatch => {
  try {
    dispatch(AuthLoading());
    let res = await axios.post("/api/auth/login", userData);
    // Save to localStorage
    const { token } = res.data;
    localStorage.setItem("jwtToken", token);
    // Set Token to Auth header
    setAuthToken(token);
    // Decode Token to get user data
    const decoded = jwt_decode(token);
    // Set current user
    dispatch(setCurrentUser(decoded));
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
    dispatch(StopAuthLoading());
  }
};

// Get Profile
export const getCurrentProfile = () => async dispatch => {
  try {
    let res = await axios.get(`/api/profile/me`);
    dispatch({
      type: GET_CURRENT_PROFILE,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

// Set login User function
export const setCurrentUser = decoded => ({
  type: SET_CURRENT_USER,
  payload: decoded
});

// Log user out
export const logoutUser = () => dispatch => {
  dispatch(clearErrors());
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove Auth Header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  // Redirect to login
};

// Clear Errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
    errors: {}
  };
};

export const AuthLoading = () => {
  return {
    type: AUTH_LOADING
  };
};

export const StopAuthLoading = () => {
  return {
    type: STOP_AUTH_LOADING
  };
};

export const masterLoader = () => {
  return {
    type: LOADING
  };
};

export const stopMasterLoader = () => {
  return {
    type: STOP_LOADING
  };
};
