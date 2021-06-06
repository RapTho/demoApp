const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ThingSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  description: {
    type: String,
    maxLength: 500,
  },
  ownerId: {
    type: [String],
    required: true,
    validate: (value) => {
      mongoose.isValidObjectId(value);
    },
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

module.exports = mongoose.model("Thing", ThingSchema);
