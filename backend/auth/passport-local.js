const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../db/models/User");

const errorMsg = "Invalid e-mail or password.";

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password", session: false },
    (email, password, done) => {
      User.findOne({ email }, async (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            message: errorMsg,
          });
        }
        if (!(await user.validatePassword(password))) {
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
