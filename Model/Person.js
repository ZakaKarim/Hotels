const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["Chef", "Waiter", "Manger"],
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

personSchema.pre("save", async function (next) {
  const person = this;
  // Hash the password only if it has been modified (or is new)
  if (!person.isModified("password")) return next();
  try {
    //hash password Generation
    const salt = await bcrypt.genSalt(10);

    //hash password
    const hash = await bcrypt.hash(person.password, salt);
    person.password = hash;
    next();
  } catch (err) {
    return next(err);
  }
});

personSchema.methods.comparedPassword = async function (candidatePassword) {
  try {
    const isMatchPassword = await bcrypt.compare(
      candidatePassword,
      this.password
    );
    return isMatchPassword;
  } catch (err) {
    throw err;
  }
};

const Person = mongoose.model("Person", personSchema);
module.exports = Person;
