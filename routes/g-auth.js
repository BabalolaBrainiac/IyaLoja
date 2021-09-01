const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const passport = require("passport");
const bcrypt = require("bcrypt");
const errors = require("restify-errors");

//Login User(Google Auth)
router.get("/login", (res, req, next) => {
  res.render("login");
});

//Logout Google User
router.get("/logout", (res, req, next) => {
  res.status(200).json("Logging Out User");
});

//Authenticate
router.get(
  "/authenticate",
  passport.authenticate("google", {
    scope: [ 'email', 'profile'],
  })
);

//Callback for Google Auth
router.get("/users", passport.authenticate("google"), (res, req, next) => {
  res.status(200).json("Redirecting User");
});

module.exports = router;
