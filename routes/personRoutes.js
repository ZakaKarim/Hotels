const express = require("express");
const router = express.Router();
const Person = require("../Model/Person");
const { jwtAuthMiddleware, generateToken } = require("./../jwt");
const { json } = require("body-parser");

//creating Person Request
//create Request
router.post("/signup", async (req, res) => {
  try {
    const data = req.body;

    const newPerson = new Person(data);

    //Save the Person Data to DB
    const response = await newPerson.save();
    console.log("Data Saved");

    const playload = {
      id: response.id,
      username: response.username,
    };
    console.log(JSON.stringify(playload));

    const token = generateToken(playload);
    console.log("Token is :", token);

    res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

//Login Route
router.post("/login", async (req, res) => {
  try {
    //Extract the username or password
    const { username, password } = req.body;
    //find the user from the database
    const user = await Person.findOne({ username: username });

    if (!user || !(await user.comparedPassword(password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    //Generate Token if user is valid
    const playload = {
      id: user.id,
      username: user.username,
    };
    const token = generateToken(playload);
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

//Profile Route
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    console.log("User Data :", userData);

    const userID = userData.id;

    const user = await Person.findById(userID);

    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

//Read Request
router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Person Data Fetching");
    res.status(200).json(data);
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

//update Query
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;
    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!response) {
      return res.status(404).json({ error: "Person Not Found" });
    }
    console.log("Data is Updated ");
    res.status(200).json(response);
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

//Delete Request
router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ error: "Person Not Found" });
    }
    console.log("Record Deleted");
    res.status(200).json({ message: "Person Record Deleted Successfully" });
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

//paramatize request
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "Chef" || workType == "Waiter" || workType == "Manger") {
      const response = await Person.find({ work: workType });
      console.log("Work type Match");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

module.exports = router;
