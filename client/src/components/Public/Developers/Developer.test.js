import { shallow } from "enzyme";
import React from "react";
import Developer from "./Developer";

it("expect to render Developer component", () => {
  const mockDev = {
    user: {
      _id: 1,
      name: "John",
      avatar: "Something"
    },
    status: "Dev",
    company: "Facebook",
    location: "USA",
    skills: [1, 2, 3, 4, 5]
  };
  expect(shallow(<Developer profile={mockDev} />).debug()).toMatchSnapshot();
});
