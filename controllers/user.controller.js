const User = require("../models/user.model");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const { validateEmail, validateLength } = require("../utils/validation");

const registerUser = async (req, res) => {
  const { firstName, lastName, email, userName, password } = req.body;

  if (!firstName) {
    return res.status(400).json({ message: "First Name Required" });
  } else {
    if (!validateLength(firstName, 3, 15)) {
      return res
        .status(400)
        .json({ message: "First Name Must Be In Between 3-15 Character." });
    }
  }

  if (!lastName) {
    return res.status(400).json({ message: "Last Name Required" });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ message: "wrong Email Address" });
  }

  if (!email) {
    return res.status(400).json({ message: "Email Required" });
    // throw new ApiError(400, "Email is required"); // Uncomment this line
  }

  if (!userName) {
    return res.status(400).json({ message: "UserName Required" });
  }

  const existedUser = await User.findOne({
    $or: [{ userName: userName }, { email: email }],
  });

  if (existedUser) {
    return res.status(400).json({ message: "User Already Exists" });
  }

  const data = { firstName, lastName, email, userName, password };
  const newUser = await User.create(data);

  res.status(200).json(new ApiResponse(200, newUser, "success sending"));
};

module.exports = registerUser;
