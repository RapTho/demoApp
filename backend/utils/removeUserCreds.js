module.exports = (input) => {
  switch (Array.isArray(input)) {
    case true:
      input.map((mentor) => {
        delete mentor.__v;
        delete mentor.password;
        delete mentor.token;

        // During mentor creation
        if (mentor._doc) delete mentor._doc.password;

        return mentor;
      });
      return input;

    case false:
      delete input.__v;
      delete input.password;
      delete input.token;

      // During mentor creation
      if (input._doc) delete input._doc.password;
      return input;

    default:
      return "failed to remove credentials";
  }
};
