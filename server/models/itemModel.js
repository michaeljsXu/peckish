const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  expiry: {
    type: Date,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  isFrozen: {
    type: Boolean,
    required: true,
  },
  count: {
    type: String,
    required: true,
  },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
