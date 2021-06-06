const express = require("express");
const router = express.Router();

const passport = require("../../auth/passport-local");
const User = require("../../db/models/User");
const generateJWT = require("../../utils/generateJWT");
const removeUserCreds = require("../../utils/removeUserCreds");

router.post("/", passport.authenticate("local"), async (req, res) => {
  let user = {};
  try {
    user = await User.findOne({ email: req.body.email }).lean();
    if (user) {
      const newJWT = generateJWT(removeUserCreds(user));
      user = await User.updateOne(
        { _id: user._id },
        { token: newJWT.token }
      ).lean();
      res.status(200).json({
        token: newJWT.token,
        expirationTime: newJWT.tokenExpiration,
      });
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
