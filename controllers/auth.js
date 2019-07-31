const { User } = require("../models");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { SECRET_KEY } = process.env;

// Load Input Validation
const validateRegisterInput = require("../middleware/validation/register");
const validateLoginInput = require("../middleware/validation/login");

exports.registerUser = async (req, res) => {
  try {
    const { errors, isValid } = validateRegisterInput(req.body);
    const { name, email, password } = req.body;
    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    let user = await User.findOne({ email: req.body.email });
    // Check if user's email already exists
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      // Get User Gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      const newUser = new User({
        name,
        email,
        avatar,
        password
      });

      let salt = await bcrypt.genSalt(10);
      let hash = await bcrypt.hash(newUser.password, salt);
      newUser.password = hash;
      let user = await newUser.save();

      // Create JWT Payload
      const payload = {
        id: user.id
      };
      // Sign Token                   // Expires in 1 day
      jwt.sign(payload, SECRET_KEY, { expiresIn: 86400 }, (err, token) => {
        res.json({
          success: true,
          token: `Bearer ${token}`
        });
      });
    }
  } catch (err) {
    res.json(err);
  }
};

exports.loginUser = (req, res) => {
  try {
    const { errors, isValid } = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({ email }).then(user => {
      // Check for user
      if (!user) {
        errors.invalid_auth = "Invalid Credentials";
        return res.status(404).json(errors);
      }

      // Check Password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User Matched
          // Create JWT Payload
          const payload = {
            id: user.id
          };
          // Sign Token                   // Expires in 1 day
          jwt.sign(payload, SECRET_KEY, { expiresIn: 86400 }, (err, token) => {
            res.json({
              success: true,
              token: `Bearer ${token}`
            });
          });
        } else {
          errors.invalid_auth = "Invalid Credentials";
          return res.status(400).json(errors);
        }
      });
    });
  } catch (err) {
    res.json(err);
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
      res.json(user);
    } else {
      return res.status(404).json({ error_message: "User not found." });
      res.status(404).json(errors);
    }
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      // If Object ID from URL is invalid, wrong format, too lengthy or too short etc.
      return res.status(404).json({ error_message: "User not found" });
    }
    res.status(500).send("Server error.");
  }
};

module.exports = exports;
