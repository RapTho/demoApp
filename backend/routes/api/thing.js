const express = require("express");
const router = express.Router();

const Thing = require("../../db/models/Thing");
const checkParemeterValidity = require("../../utils/checkParameterValidity");

router.post("/createThing", async (req, res) => {
  const allowedParams = ["name", "description", "owner", "location"];
  if (!checkParemeterValidity(req, allowedParams)) {
    return res.status(400).json({ error: "Invalide parameters" });
  }

  let newThing = new Thing(req.body);
  newThing
    .save()
    .then(() => res.status(201).json(newThing))
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
});

// router.patch("/updateThing", auth, async (req, res) => {
//   const allowedParams = ["name", "description", "owner", "location"];
//   if (!checkParemeterValidity(req, allowedParams)) {
//     return res.status(400).json({ error: "Invalide update parameters" });
//   }
// });

module.exports = router;
