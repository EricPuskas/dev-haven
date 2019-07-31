import React from "react";
import Moment from "react-moment";

const Education = ({ education, deleteEducation }) => {
  const educations = education.map(edu => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
        <Moment format="YYYY MMM">{edu.from}</Moment>
        <span className="hide-sm"> - </span>
        {edu.to === null ? " Now" : <Moment format="YYYY MMM">{edu.to}</Moment>}
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => deleteEducation(edu._id)}
        >
          <i className="fas fa-trash-alt" />
        </button>
      </td>
    </tr>
  ));
  return (
    <div className="Dashboard-edu-container">
      <h1> Education Credentials </h1>
      <div
        style={{
          backgroundColor: "rgb(249, 249, 249"
        }}
      >
        <table className="table f4">
          <thead>
            <tr>
              <th> School </th>
              <th className="hide-sm"> Degree </th>
              <th>Years </th>
              <th />
            </tr>
          </thead>
          <tbody>{educations}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Education;
