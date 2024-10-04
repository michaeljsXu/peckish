const Item = require("../models/itemModel");
const Recipe = require("../models/recipesModel");

exports.home = (req, res) => {
  res.send("Hello World");
};

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
};

exports.createItem = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: "Failed to create item" });
  }
};
