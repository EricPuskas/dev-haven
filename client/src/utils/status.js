import React from "react";
import uuid from "uuid/v4";
const titles = [
  "Developer",
  "Junior Developer",
  "Senior Developer",
  "Student or Learning",
  "Instructor",
  "Intern",
  "Other"
];
let statusArray = [];
titles.forEach(title =>
  statusArray.push({
    id: uuid(),
    value: title
  })
);

const status = statusArray.map(status => (
  <option key={status.id} value={status.value}>
    {status.value}
  </option>
));

export default status;
