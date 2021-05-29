"use strict";

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");

const selectEnvironment = require("./utils/selectEnvironment");

const app = express();
const PORT = process.env.PORT || 5000;

// Payload limit
app.use(express.json({ limit: "1mb" }));

// Handle CORS
app.use(cors());

// Security
app.use(helmet());

// Select DEV, TEST or PROD environment
dotenv.config(selectEnvironment());
console.log(process.env.TEST);

// Router base APIs
// app.use("/api/user", require("./routes/api/user"));
// app.use("/api/login", require("./routes/api/login"));
// app.use("/api/logout", require("./routes/api/logout"));
// app.use("/api/auth", require("./routes/api/logout"));
// app.use("/api/token", require("./routes/api/token"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
