const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Connect to mongoDB");
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB :", err);
    });
}

module.exports = connectDB;