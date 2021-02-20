const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //encrypt password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: passwordHash,
    });
    // JWT
    const token = jwt.sign(
      { _id: user._id, name: user.name },
      process.env.JWT_SECRET
    );

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send({
        message: "success",
      });
    console.log(user);
  } catch (error) {
    console.log(error);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    //validations
    if (!user) return res.status(400).send("Invalid email or password.");
    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect)
      return res.status(400).send("Invalid email or password.");
    //JWT
    const token = jwt.sign(
      { _id: user._id, name: user.name },
      process.env.JWT_SECRET
    );

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send({
        message: "success",
      });
    console.log(user);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
