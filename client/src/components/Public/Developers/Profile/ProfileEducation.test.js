import { shallow } from "enzyme";
import React from "react";
import ProfileEducation from "./ProfileEducation";

it("expect to render Profile Education component", () => {
  const mockProps = {
    education: [
      {
        school: "Lorem Ipsum",
        degree: "Lorem Ipsum",
        fieldofstudy: "Lorem Ipsum",
        from: "test",
        to: "test",
        description: ""
      }
    ]
  };
  expect(
    shallow(<ProfileEducation {...mockProps} />).debug()
  ).toMatchSnapshot();
});
