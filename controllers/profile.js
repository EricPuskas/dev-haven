// Load Database
const db = require("../models");
const request = require("request");
const { validateProfile } = require("../middleware/validation/profile");
const { sendError, getOptions, createProfileObj } = require("./utils");

exports.getCurrentProfile = async (req, res) => {
  try {
    const profile = await db.Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    if (!profile)
      return sendError(404, "There is no profile for this user", res);

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
};

exports.handleProfile = async (req, res) => {
  try {
    const { errors, isValid } = validateProfile(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Build profile object
    const profileFields = createProfileObj(req.body, req.user.id);
    let profile = await db.Profile.findOne({ user: req.user.id });

    if (profile) {
      // Update profile
      profile = await db.Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    //Create a profile
    profile = new db.Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
};

exports.getProfiles = async (req, res) => {
  try {
    const profiles = await db.Profile.find().populate("user", [
      "name",
      "avatar"
    ]);
    return profiles.length
      ? res.json(profiles)
      : sendError(404, "No profiles were found.", res);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
};

exports.getProfileByID = async (req, res) => {
  try {
    const profile = await db.Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name", "avatar"]);

    return profile
      ? res.json(profile)
      : sendError(404, "There is no profile for this user", res);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return sendError(404, "Profile not found.", res);
    }
    res.status(500).send("Server error.");
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    // Remove Profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove User
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ success_message: "User deleted." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
};

exports.getRepos = async (req, res) => {
  try {
    const options = getOptions(req.params.username);
    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode !== 200) {
        return sendError(404, "No Github repositories found.", res);
      }
      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
};

module.exports = exports;
