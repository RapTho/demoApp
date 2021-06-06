const express = require("express");
const router = express.Router();

const passport = require("../../auth/passport-jwt");
const User = require("../../db/models/User");
const Thing = require("../../db/models/Thing");
const checkParemeterValidity = require("../../utils/checkParameterValidity");
const removeUserCreds = require("../../utils/removeUserCreds");

router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let user = await User.findById(req.user._id).lean();
      res.status(200).json(removeUserCreds(user));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

router.post("/createUser", async (req, res) => {
  const allowedParams = ["username", "password", "email", "location"];
  if (!checkParemeterValidity(req, allowedParams)) {
    return res.status(400).json({ error: "Invalide parameters" });
  }
  try {
    let newUser = new User(req.body);
    await newUser.save();
    res.status(201).send(removeUserCreds(newUser));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.patch(
  "/me",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const allowedUpdates = ["username", "password", "email", "location"];
    if (!checkParemeterValidity(req, allowedUpdates)) {
      return res.status(400).json({ error: "Invalide update parameters" });
    }

    try {
      await User.updateOne({ _id: req.user._id }, req.body).exec();
      res.sendStatus(200);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

router.delete(
  "/me",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const session = await User.startSession();
      session.startTransaction();

      const thingIDs = await Thing.find(
        { ownerId: req.user._id },
        { _id: 1 }
      ).lean();
      const thingIDsFormated = thingIDs.map((thing) => thing._id);

      await Thing.deleteMany({ _id: { $in: thingIDsFormated } }).exec();
      User.deleteOne({ _id: req.user._id }).exec();

      await session.commitTransaction();
      session.endSession();

      res.sendStatus(200);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

module.exports = router;
