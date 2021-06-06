module.exports = (user) => {
  delete user.__v;
  delete user.password;
  delete user.token;

  // During user creation
  if (user._doc) delete user._doc.password;

  return user;
};
