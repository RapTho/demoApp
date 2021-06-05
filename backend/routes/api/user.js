const express = require("express");
const router = express.Router();

const passport = require("../../auth/passport-jwt");
const User = require("../../db/models/User");
const checkParemeterValidity = require("../../utils/checkParameterValidity");

router.post("/createUser", async (req, res) => {
  const allowedParams = ["username", "password", "email", "location"];
  if (!checkParemeterValidity(req, allowedParams)) {
    return res.status(400).json({ error: "Invalide parameters" });
  }
  try {
    let newUser = new User(req.body);
    await newUser.save();
    console.log(newUser.toJSON());
    res.status(201).send(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.patch(
  "/updateUser",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const allowedUpdates = ["username", "password", "email", "location"];
    if (!checkParemeterValidity(req, allowedUpdates)) {
      return res.status(400).json({ error: "Invalide update parameters" });
    }

    try {
      const updatedUser = await User.updateOne(
        { _id: req.user._id },
        req.body
      ).exec();
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

module.exports = router;
