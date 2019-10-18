import { shallow } from "enzyme";
import React from "react";
import ProfileAbout from "./ProfileAbout";

it("expect to render Profile About component", () => {
  const mockProps = {
    profile: {
      bio: "Lorem Ipsum",
      skills: [1, 2, 3, 4, 5],
      user: { name: "John" }
    }
  };
  expect(shallow(<ProfileAbout {...mockProps} />).debug()).toMatchSnapshot();
});
