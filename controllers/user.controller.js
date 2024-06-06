const User = require("../models/user.model");

const registerUser = (req, res) => {
  let { firstName, lastName, email } = req.body;
  console.log(firstName, lastName, email);
};

module.exports = registerUser;
