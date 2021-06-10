const express = require("express");
const router = express.Router();

const passport = require("../../auth/passport-jwt");
const Thing = require("../../db/models/Thing");
const checkParemeterValidity = require("../../utils/checkParameterValidity");

const errorMsg = [
  "Permission denied! You are not an owner of this thing.",
  "No thing found. Please provide a valid input.",
  "Invalid input!",
  "You didn't create any things yet.",
  "No things found",
];

router.post(
  "/createThing",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const allowedParams = ["name", "description", "location"];
    if (!checkParemeterValidity(req, allowedParams)) {
      return res.status(400).json({ error: "Invalide parameters" });
    }

    req.body.ownerIDs = req.user._id;

    let newThing = new Thing(req.body);
    newThing
      .save()
      .then(() => res.status(201).json(newThing))
      .catch((err) => {
        res.status(400).json({ error: err.message });
      });
  }
);

router.patch(
  "/updateThing",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const allowedParams = [
      "thingId",
      "name",
      "description",
      "ownerIDs",
      "location",
    ];
    if (!checkParemeterValidity(req, allowedParams)) {
      return res.status(400).json({ error: "Invalide update parameters" });
    }

    try {
      const thing = await Thing.findOne({ _id: req.body.thingId }).lean();
      if (!thing) {
        res.json({ error: errorMsg[1] });
        return;
      }
      if (!thing.ownerIDs.includes(req.user._id.toString())) {
        res.status(401).json({
          error: errorMsg[0],
        });
        return;
      }

      await Thing.updateOne({ _id: req.body.thingId }, req.body).exec();
      res.sendStatus(200);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

router.delete(
  "/deleteThing",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const thing = await Thing.findOne({ _id: req.query.thingId }).lean();
      if (!thing) {
        res.json({ error: errorMsg[1] });
        return;
      }
      if (!thing.ownerIDs.includes(req.user._id.toString())) {
        res.status(401).json({
          error: errorMsg[0],
        });
        return;
      }

      await Thing.deleteOne({ _id: req.query.thingId }).exec();
      res.sendStatus(200);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

router.get(
  "/getRandomThings",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (!req.query.number || isNaN(req.query.number)) {
      res.status(400).json({ error: errorMsg[2] });
      return;
    }

    try {
      const result = await Thing.find({})
        .limit(parseInt(req.query.number, 10))
        .lean();
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

router.get(
  "/getMyThings",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const result = await Thing.find({
        ownerIDs: req.user._id.toString(),
      }).lean();

      if (result.length == 0) {
        res.status(200).json({ error: errorMsg[3] });
      } else {
        res.json(result);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

router.get(
  "/getThingsNearLocation",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (
      !req.query.lat ||
      !req.query.long ||
      !req.query.radius ||
      isNaN(req.query.lat) ||
      isNaN(req.query.long) ||
      isNaN(req.query.radius)
    ) {
      res.status(400).json({ error: errorMsg[2] });
      return;
    }

    try {
      const result = await Thing.find({
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [
                parseFloat(req.query.long),
                parseFloat(req.query.lat),
              ],
            },
            $maxDistance: parseInt(req.query.radius),
          },
        },
      }).lean();

      if (result.length == 0) {
        res.status(200).json({ error: errorMsg[4] });
      } else {
        res.json(result);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

router.get(
  "/getThingsByText",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (!req.query.text || !isNaN(req.query.text)) {
      res.status(400).json({ error: errorMsg[2] });
      return;
    }

    try {
      const result = await Thing.find({
        $text: { $search: req.query.text },
      }).lean();

      if (result.length == 0) {
        res.status(200).json({ error: errorMsg[4] });
      } else {
        res.json(result);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
