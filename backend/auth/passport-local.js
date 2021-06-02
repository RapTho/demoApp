const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../db/models/User");

const errorMsg = "Incorrect username or password.";

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password", session: false },
    (email, password, done) => {
      User.findOne({ email }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            message: errorMsg,
          });
        }
        if (!user.validatePassword(password)) {
          return done(null, false, {
            message: errorMsg,
          });
        }
        return done(null, user);
      });
    }
  )
);

module.exports = passport;
