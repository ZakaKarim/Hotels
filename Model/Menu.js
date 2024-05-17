const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    // required: true,
    default: 200,
  },
  taste: {
    type: String,
    required: true,
    enum: ["Spicy", "Sweet", "Sour"],
  },
  num_sales: {
    type: Number,
    default: 0,
  },
});

const Menu = mongoose.model("Menu", menuItemSchema);
module.exports = Menu;
