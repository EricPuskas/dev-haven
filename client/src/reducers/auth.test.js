import {
  SET_CURRENT_USER,
  GET_CURRENT_PROFILE,
  LOADING,
  STOP_LOADING,
  AUTH_LOADING,
  STOP_AUTH_LOADING
} from "../actions/types";
import reducer from "./auth";

const mockInitialState = {
  isAuthenticated: false,
  loading: false,
  master_loader: true,
  user: {}
};

describe("Testing Auth Reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(mockInitialState);
  });
  const expectedResult = {
    isAuthenticated: false,
    loading: false,
    master_loader: false,
    user: {
      isAuthenticated: false,
      loading: false,
      master_loader: false,
      user: {
        _id: "5d413470c558ef25089f8a26",
        avatar:
          "//www.gravatar.com/avatar/d4aacfea41cffeb5c94d5fa23924d51a?s=200&r=pg&d=mm",
        name: "Eric Puskas"
      }
    }
  };
  it("handles GET_CURRENT_PROFILE", () => {
    expect(
      reducer(mockInitialState, {
        type: GET_CURRENT_PROFILE,
        payload: {
          ...mockInitialState,
          master_loader: false,
          user: {
            ...mockInitialState.user,
            _id: "5d413470c558ef25089f8a26",
            name: "Eric Puskas",
            avatar:
              "//www.gravatar.com/avatar/d4aacfea41cffeb5c94d5fa23924d51a?s=200&r=pg&d=mm"
          }
        }
      })
    ).toEqual(expectedResult);
  });
});
