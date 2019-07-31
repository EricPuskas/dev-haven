import {
  SET_CURRENT_USER,
  GET_CURRENT_PROFILE,
  LOADING,
  STOP_LOADING,
  AUTH_LOADING,
  STOP_AUTH_LOADING
} from "../actions/types";
import isEmpty from "../utils/isEmpty";

const initialState = {
  isAuthenticated: false,
  loading: false,
  master_loader: true,
  user: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        loading: false,
        master_loader: false,
        isAuthenticated: !isEmpty(action.payload),
        user: payload
      };
    case GET_CURRENT_PROFILE:
      return {
        ...state,
        master_loader: false,
        user: { ...state.user, ...payload }
      };
    case LOADING:
      return {
        ...state,
        master_loader: true
      };
    case STOP_LOADING:
      return {
        ...state,
        master_loader: false
      };
    case AUTH_LOADING:
      return {
        ...state,
        loading: true
      };
    case STOP_AUTH_LOADING:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
