const mongoose = require("mongoose");

const url = `mongodb+srv://${process.env.dbUsername}:${process.env.dbPassword}@cluster0.3r5mijt.mongodb.net/${process.env.dbName}`;

async function dbConnection() {
  try {
    await mongoose.connect(url);
    console.log("mongodb connected successfully");
  } catch (error) {
    console.log("error connecting with mongodb :", error);
  }
}

module.exports = dbConnection;
