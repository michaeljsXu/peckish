const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: false,
  },
  expiry: {
    type: Date,
    required: false,
  },
  tags: {
    type: [String],
    required: false,
  },

  count: {
    type: String,
    required: false,
  },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
