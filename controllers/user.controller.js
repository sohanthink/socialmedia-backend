const User = require("../models/user.model");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const sendEmail = require("../utils/mailer");
const { jwtoken } = require("../utils/token");
const { validateEmail, validateLength } = require("../utils/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { firstName, lastName, email, userName, password, birthDate, gender } =
    req.body;

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

  if (!email) {
    return res.status(400).json({ message: "Email Required" });
    // throw new ApiError(400, "Email is required");
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ message: "wrong Email Address" });
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

  const data = {
    firstName,
    lastName,
    email,
    userName,
    password,
    birthDate,
    gender,
  };

  const newUser = await User.create(data);

  const emailToken = jwtoken({ id: newUser._id.toString() }, "30m");

  const url = `${process.env.URL}/activate/${emailToken}`;
  sendEmail(newUser.email, newUser.firstName, url);

  const token = jwtoken({ id: newUser._id.toString() }, "7d");

  // newUser.token = token;
  // await newUser.save();

  res.status(200).json({
    data: newUser,
    message: "Email Verification Link Sent!!",
  });
};

const verifiedUser = async (req, res) => {
  try {
    const { token } = req.body;
    const check = jwt.verify(token, process.env.SECRET_TOKEN);
    const user = await User.findById(check.id);

    if (!user) {
      return res.status(404).json({
        message: "invalid Authorization",
      });
    }

    if (user.isVerified === true) {
      return res.status(200).json({
        message: "User Already Verified",
      });
    } else {
      await User.findByIdAndUpdate(check.id, { isVerified: true });
      return res.status(200).json({
        message: "User Verified Succesfully",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if ([email, password].some((field) => field?.trim() == "")) {
    return res.status(400).json({
      message: "Email and Password fields are required",
    });
  }

  if (!user) {
    return res.status(404).json({
      message: "User Desent Exists",
    });
  }

  const passcheck = await bcrypt.compare(password, user.password);
  if (!passcheck) {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }

  const token = jwtoken({ id: user._id.toString() }, "7d");
  // userDetails = await User.findOne({ email }).select("-password token:token");

  return res.status(200).json({
    message: "Login successfull",
    id: user._id,
    userName: user.userName,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    profilePicture: user.profilePicture,
    cover: user.cover,
    isVerified: user.isVerified,
    token: token,
  });
});

const auth = asyncHandler(async (req, res) => {
  return res.status(200).json({
    message: "valid USer",
  });
});

module.exports = { registerUser, loginUser, verifiedUser, auth };
