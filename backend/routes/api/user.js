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
    if (err.message.includes("E11000")) {
      res.status(409).json({ error: "Username and/or e-mail already taken!" });
    }
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
    const session = await User.startSession();
    try {
      session.startTransaction();
      const thingIDs = await Thing.find(
        { ownerIDs: req.user._id.toString() },
        { _id: 1 },
        { session }
      ).lean();
      const thingIDsFormated = thingIDs.map((thing) => thing._id);

      await Thing.deleteMany(
        { _id: { $in: thingIDsFormated } },
        { session }
      ).exec();
      await User.deleteOne({ _id: req.user._id }, { session }).exec();

      await session.commitTransaction();
      session.endSession();

      res.sendStatus(200);
    } catch (err) {
      res.status(500).json({ error: err.message });
      session.endSession();
    }
  }
);

module.exports = router;
