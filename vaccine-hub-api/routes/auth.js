const express = require("express");
const { restart } = require("nodemon");
const router = express.Router();
const User = require("../models/users");

router.post("/login", async (req, res, next) => {
  try {
    //Take users email and password and authenticate them
    const user = await User.login(req.body);
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    //Take users email and password and register them
    //Creates new user in database
    const user = await User.register(req.body);
    return res.status(201).json({ user });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
