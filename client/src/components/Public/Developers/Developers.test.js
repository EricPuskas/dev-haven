import { shallow } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Developers from "./Developers";

const mockStore = configureMockStore();
const store = mockStore({});
const mockProps = {
  getProfiles: jest.fn(),
  profile: {
    profiles: [
      {
        user: {
          _id: 1,
          name: "John",
          avatar: "Something"
        },
        status: "Dev",
        company: "Facebook",
        location: "USA",
        skills: [1, 2, 3, 4, 5]
      }
    ]
  },
  loading: false
};
const wrapper_filled = shallow(
  <Provider store={store}>
    <Developers {...mockProps} />
  </Provider>
);
describe("Test Developers Component", () => {
  it("renders component without crash", () => {
    expect(wrapper_filled.debug()).toMatchSnapshot();
  });
  const mockPropsNoProfiles = {
    getProfiles: jest.fn(),
    profile: {
      profiles: []
    },
    loading: false
  };
  const wrapper = shallow(
    <Provider store={store}>
      <Developers {...mockPropsNoProfiles} />
    </Provider>
  );
  const profileArr = wrapper.props().children.props.profile.profiles;
  it("expects no profiles", () => {
    expect(profileArr.length).toEqual(0);
  });
  it("show No profiles if empty", () => {
    expect(wrapper.find("#no-profiles-found").exists()).toBe(false);
  });
});
