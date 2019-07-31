import jwt_decode from "jwt-decode";
// Utilities
import setAuthToken from "./setAuthToken";

// Actions
import { setCurrentUser, logoutUser } from "../actions/auth";

const checkToken = store => {
  // Check for token
  if (localStorage.jwtToken) {
    // Set auth token header auth
    setAuthToken(localStorage.jwtToken);

    // Decode token and get user info and exp
    const decoded = jwt_decode(localStorage.jwtToken);

    // Set User and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      // Logout User
      store.dispatch(logoutUser());

      // Redirect to login
      window.location.href = "/";
    }
  }
  return [store];
};
export default checkToken;
