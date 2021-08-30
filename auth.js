const GoogleStrategy = require("passport-google-oauth2").Strategy;
const passport = require("passport");
const User = require("./models/user");
const generator = require("generate-password");

//Google Client
const GOOGLE_CLIENT_ID =
  "508398302179-r7gjngaaqdo9e3jtr6hh75jt0kaaok5u.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "0hAzATNVV5z01DfT0B-0yt_w";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/users",
      passReqToCallback: true,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("Callback function called");
      console.log(profile);
    }
  )
);
