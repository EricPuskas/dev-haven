import { shallow } from "enzyme";
import React from "react";
import Experience from "./Experience";

it("expect to render Experience component", () => {
  const mockExp = [
    {
      _id: 1,
      company: "Google",
      title: "Developer",
      from: "10/18/2018",
      to: null
    }
  ];

  expect(
    shallow(<Experience experience={mockExp} />).debug()
  ).toMatchSnapshot();
});
