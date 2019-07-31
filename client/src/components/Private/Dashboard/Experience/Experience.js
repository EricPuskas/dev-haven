import React from "react";
import Moment from "react-moment";

const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map(exp => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        <Moment format="YYYY MMM">{exp.from}</Moment>
        <span className="hide-sm"> - </span>
        {exp.to === null ? " Now" : <Moment format="YYYY MMM">{exp.to}</Moment>}
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => deleteExperience(exp._id)}
        >
          <i className="fas fa-trash-alt" />
        </button>
      </td>
    </tr>
  ));
  return (
    <div className="Dashboard-exp-container">
      <h1> Experience Credentials </h1>
      <div
        style={{
          backgroundColor: "rgb(249, 249, 249"
        }}
      >
        <table className="table f4">
          <thead>
            <tr>
              <th>Company</th>
              <th className="hide-sm">Title </th>
              <th>Years </th>
              <th />
            </tr>
          </thead>
          <tbody>{experiences}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Experience;
