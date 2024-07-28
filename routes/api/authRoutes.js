const express = require("express");
const {
  registerUser,
  loginUser,
  verifiedUser,
} = require("../../controllers/user.controller");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/activate", verifiedUser);

module.exports = router;
