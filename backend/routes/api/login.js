const express = require("express");
const router = express.Router();
const passport = require("../../auth/passport-local");

// const passport = require("../../auth/passport-local");
const User = require("../../db/models/User");
const generateJWT = require("../../utils/generateJWT");

// router.post(
//   "/login",
//   passport.authenticate("local", {
//     session: false,
//     successRedirect: "/",
//     failureRedirect: "/login",
//     failureFlash: true,
//   }),
//   async (req, res) => {}
// );

router.post(
  "/",
  passport.authenticate("local", { failureRedirect: "/login" }),
  async (req, res) => {
    let user = {};
    try {
      user = await User.findOne({ email: req.body.email }).lean();
      if (user) {
        delete user.token;
        delete user.password;
        const newJWT = generateJWT(user);
        user = await User.updateOne(
          { _id: user._id },
          { token: newJWT.token }
        ).lean();
        res.status(200).json({
          token: newJWT.token,
          expirationTime: newJWT.tokenExpiration,
        });
      } else {
        res.status(401).json({ error: "Invalid e-mail or password" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
