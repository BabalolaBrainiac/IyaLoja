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

router.get("/", (req, res, next) => {
  User.find()
    .populate("portfolio _id username")
    .exec()
    .then((users) => {
      console.log(users);
      res.status(200).json({
        count: userss.length,
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

module.exports = router;
