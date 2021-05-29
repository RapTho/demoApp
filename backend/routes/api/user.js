const express = require("express");
const router = express.Router();

const User = require("../../db/models/User");

router.post("/createUser", async (req, res) => {
  const params = Object.keys(req.body);
  const allowedParams = ["username", "password", "email", "location"];
  const isValidOperation = params.every((param) =>
    allowedParams.includes(param)
  );

  if (!isValidOperation) {
    return res.status(400).json({ error: "Invalide parameters" });
  }

  let newUser = new User(req.body);

  try {
    newUser.save();
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
    return;
  }
});

// router.patch("/me", auth, async (req, res) => {
//   const updates = Object.keys(req.body);
//   const allowedUpdates = [
//     "username",
//     "password",
//     "email",
//     "location",
//   ];
//   const isValidOperation = updates.every((update) =>
//     allowedUpdates.includes(update)
//   );

//   if (!isValidOperation) {
//     return res.status(400).json({ error: "Invalide update parameters" });
//   }
// });

module.exports = router;
