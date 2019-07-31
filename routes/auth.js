const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUser } = require("../controllers/auth");

// @route   POST api/auth/register
// @desc    Register new users
// @access  Public
router.post("/register", registerUser);

// @route   POST api/auth/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post("/login", loginUser);

// @route  GET api/auth/:id
// @desc   Get User by ID
// @access Public
router.get("/:id", getUser);

module.exports = router;
