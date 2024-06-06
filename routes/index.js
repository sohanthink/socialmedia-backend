const express = require("express");
const router = express.Router();
const apiRoutes = require("./api");

const api = process.BASE_URL;

router.use(api, apiRoutes);

// middleware if the routes doesent found
app.use((req, res, next) => {
  res.status(404).send("Sorry, we cannot find that!");
});

module.exports = router;
