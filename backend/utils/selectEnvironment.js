const dotenv = require("dotenv");

const selectEnvironment = () => {
  let config = {};
  console.log(process.env.NODE_ENV);
  switch (process.env.NODE_ENV) {
    case "dev":
      dotenv.config = {
        debug: true,
        path: "./env/dev.env",
      };
      break;
    case "test":
      dotenv.config = {
        debug: true,
        path: "./env/test.env",
      };
      break;
    case "prod":
      dotenv.config = {
        debug: false,
        path: "./env/prod.env",
      };
      break;
    default:
      throw Error("NODE_ENV doesn't match any known environment");
  }
};

module.exports = selectEnvironment;
