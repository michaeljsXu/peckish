const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: { type: String, required: true },
  favourites: { type: String, required: false },
  dislikes: { type: String, required: false },
  tools: { type: String, required: false },
  allergies: { type: String, required: false },
  diet: { type: String, required: false },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
