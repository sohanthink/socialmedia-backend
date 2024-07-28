const jwt = require("jsonwebtoken");

exports.jwtoken = (user, expiresIn) => {
  return jwt.sign(user, process.env.SECRET_TOKEN, {
    expiresIn,
  });
};
