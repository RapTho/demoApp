const express = require("express");
const router = express.Router();

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

router.post("/", async (req, res) => {
  let user = {};
  try {
    user = await User.findOne({ email: req.body.email }).lean();

    if (user) {
      const newJWT = generateJWT(user);
      User.findOneAndUpdate({ _id: user._id }, { token: newJWT.token });
      res
        .status(200)
        .json({ token: newJWT.token, expirationTime: newJWT.tokenExpiration });
    } else {
      res.status(400).json({ error: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
