module.exports = (req, allowedParams) => {
  const params = Object.keys(req.body);
  return params.every((param) => allowedParams.includes(param));
};
