const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  recipeName: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: false,
  },
  desc: {
    type: String,
    required: false,
  },
  ingredients: {
    type: String,
    required: false,
  },
  steps: {
    type: String,
    required: false,
  },
  tools: {
    type: String,
    required: false,
  },
  time: {
    type: String,
    required: false,
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
