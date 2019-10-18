import { shallow } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Profile from "./Profile";

const mockStore = configureMockStore();
const store = mockStore({});
const mockProps = {
  match: {
    params: {
      id: 1
    }
  },
  getProfileByID: jest.fn(),
  profile: {
    profile: [
      {
        experience: [{ _id: 1 }],
        education: [{ _id: 2 }],
        githubusername: "john912",
        user: {
          _id: 1231
        }
      }
    ],
    loading: false
  },
  auth: {
    isAuthenticated: true,
    loading: false,
    user: {
      _id: 1231
    }
  }
};
const wrapper_filled = shallow(
  <Provider store={store}>
    <Profile {...mockProps} />
  </Provider>
);
describe("Test Profile Component", () => {
  it("renders component without crash", () => {
    expect(wrapper_filled.debug()).toMatchSnapshot();
  });
});
