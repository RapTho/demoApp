"use strict";

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const passport = require("./auth/passport");
const mongoose = require("./db/mongoose");
const selectEnvironment = require("./utils/selectEnvironment");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "1mb" }));
app.use(cors());
app.use(helmet());
app.use(passport.initialize());

// Select DEV, TEST or PROD environment
selectEnvironment();

mongoose.connect();

// Router base APIs
app.use("/api/user", require("./routes/api/user"));
app.use("/api/thing", require("./routes/api/thing"));
app.use("/api/auth", require("./routes/api/auth"));

const server = app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
);

// For testing with jest
module.exports = server;
