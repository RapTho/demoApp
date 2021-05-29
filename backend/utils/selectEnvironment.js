const selectEnvironment = () => {
  let config = {};
  console.log(process.env.NODE_ENV);
  switch (process.env.NODE_ENV) {
    case "dev":
      config = {
        debug: true,
        path: "./env/dev.env",
      };
      break;
    case "test":
      config = {
        debug: true,
        path: "./env/test.env",
      };
      break;
    case "prod":
      config = {
        debug: false,
        path: "./env/prod.env",
      };
      break;
    default:
      throw Error("NODE_ENV doesn't match any known environment");
  }
  return config;
};

module.exports = selectEnvironment;
