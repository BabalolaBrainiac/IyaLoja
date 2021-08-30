const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const errors = require("restify-errors");

//Register New User with Email

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 0, (err, hash) => {
    if (err) {
      return next(
        new errors.InternalServerError("Password Could Not be Saved")
      );
    } else {
      const user = new User({
        _id: req.body._id,
        email: req.body.email,
        username: req.body.username,
        password: hash,
      });
      user
        .save()
        .then((newUser) => {
          console.log(newUser);
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

//Get All Users

router.get("/users", (req, res, next) => {
  User.find()
    .select("id username portfolio")
    .populate("portfolio")
    .exec()
    .then((users) => {
      console.log(users);
      res.status(200).json({
        count: users.length,
        message: users.map((user) => {
          return {
            _id: user._id,
            username: user.username,
            portfolio: user.portfolio,
          };
        }),
      });
    })
    .catch((error) => {
      return next(new errors.InternalServerError("Unable to get Users"));
    });
});

//Get Specific User by ID

router.get("/:userId", (req, res, next) => {
  User.findbyId(req.params.userId)
    .select("id username portfolio")
    .populate("portfolio")
    .exec()
    .then((user) => {
      if (!user) {
        res.status(404).json("User Not Found");
      }
      res.status(200).json({
        message: "User details provided below",
        user: user,
      });
    })
    .catch((error) => {
      return next(new errors.InternalServerError("Unable to get User"));
    });
});

//Delete User(By ID)

router.delete("/:userId", (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then((user) => {
      res.status(200).json({
        message: "User Deleted",
      });
    })
    .catch((error) => {
      return next(new errors.InternalServerError("Unable to Delete User"));
    });
});
//508398302179-r7gjngaaqdo9e3jtr6hh75jt0kaaok5u.apps.googleusercontent.com
//0hAzATNVV5z01DfT0B-0yt_w

module.exports = router;
