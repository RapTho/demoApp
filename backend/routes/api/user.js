const express = require("express");
const router = express.Router();

router.patch("user/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "username",
    "firstname",
    "lastname",
    "password",
    "email",
    "location",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ error: "Invalide update parameter" });
  }
});
