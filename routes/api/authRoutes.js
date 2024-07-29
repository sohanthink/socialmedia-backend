const express = require("express");
const {
  registerUser,
  loginUser,
  verifiedUser,
  auth,
} = require("../../controllers/user.controller");
const { authUser } = require("../../middleware/auth");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/activate", verifiedUser);
router.post("/auth", authUser, auth);

module.exports = router;
