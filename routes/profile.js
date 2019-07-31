const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const {
  getCurrentProfile,
  handleProfile,
  getProfiles,
  getProfileByID,
  deleteProfile,
  getRepos
} = require("../controllers/profile");
const {
  updateProfileExp,
  deleteExpFromProfile,
  updateProfileEdu,
  deleteEduFromProfile
} = require("../controllers/credentials");

// @route  GET api/profile/me
// @desc   Get current users profile
// @access Private
router.get("/me", requireAuth, getCurrentProfile);

// @route  PUT api/profile
// @desc   Create a user profile
// @access Private
router.put("/", requireAuth, handleProfile);

// @route  GET api/profile
// @desc   Get all profiles
// @access Public
router.get("/", getProfiles);

// @route  GET api/profile/user/:user_id
// @desc   Get profile by user id
// @access Public
router.get("/user/:user_id", getProfileByID);

// @route  DELETE api/profile
// @desc   Detelete profile, user & posts
// @access Private
router.delete("/", requireAuth, deleteProfile);

// @route  PUT api/profile/experience
// @desc   Update Profile Experience
// @access Private
router.put("/experience", requireAuth, updateProfileExp);

// @route  DELETE api/profile/experience/:exp_id
// @desc   Delete experience from Profile
// @access Private
router.delete("/experience/:exp_id", requireAuth, deleteExpFromProfile);

// @route  PUT api/profile/education
// @desc   Update Profile Education
// @access Private
router.put("/education", requireAuth, updateProfileEdu);

// @route  DELETE api/profile/education/:exp_id
// @desc   Delete education from Profile
// @access Private
router.delete("/education/:edu_id", requireAuth, deleteEduFromProfile);

// @route  GET api/profile/github/:username
// @desc   GET user repos from Github
// @access Public
router.get("/github/:username", getRepos);

module.exports = router;
