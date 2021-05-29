const mongoose = require("mongoose");
const chalk = require("chalk");

mongoose
  .connect(process.env.MONGODBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => {
    throw new Error(chalk.bold.red(`MongoDB error: ${err.message}`));
  });
