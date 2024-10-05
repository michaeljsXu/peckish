const mongoose = require('mongoose');

const seenItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    unique: true // Ensure the name is unique
  },
  icon: {
    type: String,
    required: false
  },
  expiry: {
    type: Date,
    required: false
  },
  tags: [String],
  isFrozen: {
    type: Boolean,
    default: false
  },
});

const SeenItem = mongoose.model('SeenItem', seenItemSchema);

module.exports = SeenItem;