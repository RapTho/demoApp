const jwt = require("jsonwebtoken");

const generateJWT = (user = {}) => {
  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "3 days",
  });

  const tokenMultiplier = 3 * 24 * 60 * 60;
  const tokenExpiration = Math.floor(Date.now() / 1000) + tokenMultiplier;

  return {
    token,
    tokenExpiration,
  };
};

module.exports = generateJWT;
