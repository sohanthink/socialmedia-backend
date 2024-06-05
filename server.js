const express = require("express");
require("dotenv").config();
const app = express();

// middleware if the routes doesent found
app.use((req, res, next) => {
  res.status(404).send("Sorry, we cannot find that!");
});

app.get("/", (req, res) => {
  res.send("hello social backend");
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log("server is running");
});
