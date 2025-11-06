const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/user");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.redirect("/register?error=User already exists");
    }

    user = new User({ name, email, password });
    await user.save();
    res.redirect("/login?message=Registration successful");
  } catch (err) {
    console.error(err);
    res.redirect("/register?error=Registration failed");
  }
});

// Login
router.post("/login", passport.authenticate("local", {
  successRedirect: "/dashboard",
  failureRedirect: "/login?error=Invalid credentials",
}));

module.exports = router;

