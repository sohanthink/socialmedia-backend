const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const dbConnection = require("./config/dbConfig");

// db connection
dbConnection();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

const port = process.env.PORT;
app.listen(port, () => {
  console.log("server is running");
});
