const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const dbConnection = require("./config/dbConfig");
const route = require("./routes");

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());

// db connection
dbConnection();

const port = process.env.PORT;
app.listen(port, () => {
  console.log("server is running");
});

app.use(route);
