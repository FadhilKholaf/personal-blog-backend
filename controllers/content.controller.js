const Content = require("../models/content.model");
const mongoose = require("mongoose");

// get all content
exports.getContents = async (req, res) => {
  const contents = await Content.find({}).sort({ createdAt: -1 });
  res.status(200).json(contents);
};

// get a single content
exports.getContent = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such content" });
  }
  const content = await Content.findById(id);
  if (!content) {
    return res.status(400).json({ error: "No such content" });
  }
  res.status(200).json(content);
};

// create a new content
exports.createContent = async (req, res) => {
  const { image, title, category, text } = req.body;
  // add to the database
  try {
    const content = await Content.create({ image, title, category, text });
    res.status(200).json(content);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a content
exports.deleteContent = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such content" });
  }
  const content = await Content.findOneAndDelete({ _id: id });
  if (!content) {
    return res.status(400).json({ error: "No such content" });
  }
  res.status(200).json(content);
};

// update a content
exports.updateContent = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such content" });
  }
  const content = await Content.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!content) {
    return res.status(400).json({ error: "No such content" });
  }
  res.status(200).json(content);
};
