const express = require("express");
const router = express.Router();
const Menu = require("../Model/Menu");

//Creating Menu requests
//create Request
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const MenuItem = new Menu(data);

    //Save the MenuItem  Data to DB
    const response = await MenuItem.save();
    console.log("Menu Data Save Successfully");
    res.status(200).json(response);
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

//Read Request
router.get("/", async (req, res) => {
  try {
    const data = await Menu.find();
    console.log("Menu Data is fetching");
    res.status(200).json(data);
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

//updated Request For menu
router.put("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;
    const updatedMenuData = req.body;
    const response = await Menu.findByIdAndUpdate(menuId, updatedMenuData, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      return res.status(404).json({ error: "Menu Item Not Found" });
    }
    console.log("Menu Data is  Updated ");
    res.status(200).json(response);
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

//Delete Request
router.delete("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;
    const response = await Menu.findByIdAndDelete(menuId);
    if (!response) {
      return res.status(404).json({ error: "Menu Item Not Found" });
    }
    console.log("Menu Item Delete");
    res.status(200).json({ message: "Menu Item Deleted Successfully" });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

//paramatize request
router.get("/:taste", async (req, res) => {
  try {
    const taste = req.params.taste;
    if (taste == "Spicy" || taste == "Sweet" || taste == "Sour") {
      const response = await Menu.find({ taste: taste });
      console.log("Taste Match from Menu");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid Taste  type" });
    }
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

module.exports = router;
