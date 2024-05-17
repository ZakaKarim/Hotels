const express = require("express");
const router = express.Router();
const Person = require("../Model/Person");

//creating Person Request
//create Request
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const newPerson = new Person(data);

    //Save the Person Data to DB
    const response = await newPerson.save();
    console.log("Data Saved");
    res.status(200).json(response);
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

//Read Request
router.get("/", async (req, res) => {
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
