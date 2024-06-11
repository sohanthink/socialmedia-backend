const jwt = require("jsonwebtoken");

exports.jwtoken = (user, expiresIn) => {
  return jwt.sign(user, "nfkjnkgjnerjkvn", {
    expiresIn,
  });
};
