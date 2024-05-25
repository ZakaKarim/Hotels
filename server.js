const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const passport = require("./auth");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

//Middleware Function
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`
  );
  next();
};
app.use(logRequest);

app.use(passport.initialize());
const LocalAuthMiddleware = passport.authenticate("local", { session: false });
app.get("/", function (req, res) {
  res.send("Hello Welcome to my hotel...how can i serve you");
});

// Import the Router file
const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");

//Use the Routers
app.use("/person", personRoutes);
app.use("/menu", menuRoutes);

app.listen(3500, () => {
  console.log(`Server is runing on port 3500`);
});

//adding for testing purpose
