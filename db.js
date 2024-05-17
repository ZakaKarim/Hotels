const mongoose = require("mongoose");

const mongoURL = "mongodb://127.0.0.1:27017/Hotels";
mongoose.connect(mongoURL, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to MongoDB");
});

db.on("disconnected", () => {
  console.log("MongoDB is DisConnected");
});

db.on("error", (err) => {
  console.error("MongoDB is facing an error", err);
});

module.exports = db;
