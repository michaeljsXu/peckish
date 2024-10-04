// models/seenItemModel.js
const mongoose = require('mongoose');

const seenItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true // Ensure the name is unique
  },
  icon: {
    type: String,
    required: true
  },
  expiry: {
    type: Date,
    required: true
  },
  tags: [String],
  isFrozen: {
    type: Boolean,
    default: false
  },
});

const SeenItem = mongoose.model('SeenItem', seenItemSchema);

module.exports = SeenItem;