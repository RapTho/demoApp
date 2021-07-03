const mongoose = require("mongoose");
const chalk = require("chalk");

let db;

const connect = async () => {
  await mongoose
    .connect(process.env.MONGODBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then((database) => {
      db = database;
      console.log("MongoDB connected!");
    })
    .catch((err) => {
      throw new Error(chalk.bold.red(`MongoDB error: ${err.message}`));
    });
};

const disconnect = async () => {
  await mongoose.disconnect();
};

module.exports = { connect, disconnect };
