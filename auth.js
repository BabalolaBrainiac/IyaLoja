const GoogleStrategy = require("passport-google-oauth2").Strategy;
const passport = require("passport");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const errors = require("restify-errors");
const generator = require("generate-password");

//Google Client
const GOOGLE_CLIENT_ID =
  "508398302179-r7gjngaaqdo9e3jtr6hh75jt0kaaok5u.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "0hAzATNVV5z01DfT0B-0yt_w";

//Google Passport Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/users",
      passReqToCallback: true,
    },
    (accessToken, refreshToken, profile, email, done) => {
      console.log("Callback function called");
      console.log(email, profile);

      // User Password Strategy(This will generate a new passoword for the new Google user)
      const newPassword = generator.generate({
        length: 15,
        numbers: true,
      });

      //Hashing New User Password(This will hash the generated password, making it more secure)
      bcrypt.hash(newPassword, 0, (err, hash) => {
        if (err) {
          return next(
            new errors.InternalServerError("Password Could Not be Saved")
          );
        } else {
          return hash;
        }
      });
      //Create new google User
      new User({
        username: profile.displayName,
        _id: profile.id,
        password: hash,
        email: profile.email,
      })
        .save()
        .then((user) => {
          console.log(user);
          res.status(200).json("User has been Created");
        })
        .catch((err) => {
          return new errors.InternalServerError("User Could not be Created");
        });
    }
  )
);
