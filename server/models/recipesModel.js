const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  recipeName: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  steps: {
    type: String,
    required: true,
  },
  tools: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
