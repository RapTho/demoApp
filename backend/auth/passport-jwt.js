const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("../db/models/User");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const authFunc = async (jwtPayload, done) => {
  try {
    const user = await User.findOne({ _id: jwtPayload._id }).lean();

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    done(err, false);
  }
};

passport.use(new JwtStrategy(options, authFunc));

module.exports = passport;
