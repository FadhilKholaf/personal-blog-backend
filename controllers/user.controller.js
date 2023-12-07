const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// generate token
const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET);
};

// get all User
exports.getUsers = async (req, res) => {
  const Users = await User.find({}).sort({ createdAt: -1 });
  res.status(200).json(Users);
};

// get a single User
exports.logIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).json({ error: "No such user" });
  }
  const passwordValidation = await bcrypt.compare(password, user.password);
  if (!passwordValidation) {
    return res.status(400).json({ error: "Invalid password" });
  }
  const token = generateToken(user._id);
  res.status(200).json({ email: user.email, token });
};

// create a new User
exports.signUp = async (req, res) => {
  const { email, password } = req.body;
  // add to the database
  try {
    const user = await User.signup(email, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a User
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such user" });
  }
  const user = await User.findOneAndDelete({ _id: id });
  if (!user) {
    return res.status(400).json({ error: "No such user" });
  }
  res.status(200).json(user);
};

// update a User
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such user" });
  }
  const user = await User.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!user) {
    return res.status(400).json({ error: "No such user" });
  }
  res.status(200).json(user);
};
