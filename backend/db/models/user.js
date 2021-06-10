const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    maxLength: 30,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate: (value) => {
      if (!validator.isEmail(value)) throw new Error("Email address invalid!");
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    validate: (value) => {
      let rules = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/;
      if (!value.match(rules))
        throw new Error(
          "Password too weak. Use at least 8 characters including: lower-case, upper-case and special characters and a digit"
        );
    },
  },
  token: {
    type: String,
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

UserSchema.pre("save", async function save(next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.pre("updateOne", async function updateOne(next) {
  if (this._update.token || this._update.token === "") return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this._update.password = await bcrypt.hash(this._update.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.validatePassword = async function validatePassword(pwd) {
  return bcrypt.compare(pwd, this.password);
};

module.exports = mongoose.model("User", UserSchema);
