module.exports = (user) => {
  delete user.__v;
  delete user.password;
  delete user.token;
  return user;
};
