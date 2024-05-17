const express = require("express");
const app = express();
const db = require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

// const Person = require("./Model/Person");

// const Menu = require("./Model/Menu");

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
