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

  let newUser = new User(req.body);
  newUser
    .save()
    .then(() => res.status(201).json(newUser))
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
});

router.patch(
  "/me",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const allowedUpdates = ["username", "password", "email", "location"];
    if (!checkParemeterValidity(req, allowedUpdates)) {
      return res.status(400).json({ error: "Invalide update parameters" });
    }
  }
);

module.exports = router;
