const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const errors = require("restify-errors");

//Register New User

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 0, (err, hash) => {
    if (err) {
      return next(
        new errors.InternalServerError("Password Could Not be Saved")
      );
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        username: req.body.username,
        password: hash,
      });
      user
        .save()
        .then((user) => {
          console.log(user);
          res.status(200).json({
            message: "User has been Created",
          });
        })
        .catch((error) => {
          return next(
            new errors.InternalServerError("User Could not be Created")
          );
        });
    }
  });
});

module.exports = router;
