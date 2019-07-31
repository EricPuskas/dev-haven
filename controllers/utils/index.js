const jwt = require("jsonwebtoken");
const { CLIENT_SECRET, CLIENT_ID } = process.env;

exports.sendError = (stat, message, res) => {
  return res.status(stat).json({ error_message: message });
};

exports.rmFromArr = (array, check) => {
  const removeIndex = array.map(item => item.id).indexOf(check);
  return array.splice(removeIndex, 1);
};

exports.exists = (arr, id) => {
  return (
    arr.filter(item => (item.user || item._id || item.id).toString() === id)
      .length > 0
  );
};

exports.getOptions = username => {
  let baseURL = `https://api.github.com/users/${username}`;
  let repos = "/repos?per_page=5&sort=created:asc";
  let clientInfo = `&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
  return {
    uri: `${baseURL}${repos}${clientInfo}`,
    method: "GET",
    headers: { "user-agent": "node.js" }
  };
};

exports.createProfileObj = (data, id) => {
  return {
    user: id,
    company: data.company,
    website: data.website,
    location: data.location,
    bio: data.bio,
    status: data.status,
    githubusername: data.githubusername,
    skills: data.skills
      ? data.skills.split(",").map(skill => skill.trim())
      : [],
    social: {
      youtube: data.youtube,
      twitter: data.twitter,
      facebook: data.facebook,
      linkedin: data.linkedin,
      instagram: data.instagram
    }
  };
};

exports.createExpObj = data => {
  return {
    title: data.title,
    company: data.company,
    location: data.location,
    from: data.from,
    to: data.to,
    current: data.current,
    description: data.description
  };
};

exports.createEduObj = data => {
  return {
    school: data.school,
    degree: data.degree,
    fieldOfStudy: data.fieldOfStudy,
    from: data.from,
    to: data.to,
    current: data.current,
    description: data.description
  };
};

module.exports = exports;
