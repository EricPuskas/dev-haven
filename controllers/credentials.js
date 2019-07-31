// Load Database
const db = require("../models");
const request = require("request");
const {
  validateExp,
  validateEdu
} = require("../middleware/validation/profile");
const {
  sendError,
  rmFromArr,
  exists,
  createExpObj,
  createEduObj
} = require("./utils");

exports.updateProfileExp = async (req, res) => {
  try {
    const { errors, isValid } = validateExp(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    const newExp = createExpObj(req.body);
    const profile = await db.Profile.findOne({ user: req.user.id });
    profile.experience.unshift(newExp); // Add at the beginning of the array.
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error.");
  }
};

exports.deleteExpFromProfile = async (req, res) => {
  try {
    const profile = await db.Profile.findOne({ user: req.user.id });
    const { experience } = profile;
    const { exp_id } = req.params;
    const foundExp = exists(experience, exp_id);
    if (foundExp) {
      rmFromArr(experience, exp_id);
      await profile.save();
      res.json(profile);
    } else {
      return sendError(400, "Invalid request.", res);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
};

exports.updateProfileEdu = async (req, res) => {
  try {
    const { errors, isValid } = validateEdu(req.body);
    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    const newEdu = createEduObj(req.body);
    const profile = await Profile.findOne({ user: req.user.id });
    profile.education.unshift(newEdu); // Add at the beginning of the array.
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error.");
  }
};

exports.deleteEduFromProfile = async (req, res) => {
  try {
    const profile = await db.Profile.findOne({ user: req.user.id });
    const { education } = profile;
    const { edu_id } = req.params;
    const foundEdu = exists(education, edu_id);
    if (foundEdu) {
      rmFromArr(education, edu_id);
      await profile.save();
      res.json(profile);
    } else {
      return sendError(400, "Invalid request.", res);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
};

module.exports = exports;
