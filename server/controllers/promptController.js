const ingredientAgent = require('../openai/ingredientAgent');
const recipeAgent = require('../openai/recipeAgent');
const imageAgent = require('../openai/imageAgent');
const seenItem = require('../models/seenItemModel');

// Controller function to handle output from chatbot to the user
exports.promptMessage = async (req, res) => {
  try {
    //console.log(req.body);
    const result = await recipeAgent.agent(req.body.prompt, req.body.useAvailable);
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.promptItem = async (req, res) => {
    try {
      const prompt = req.body.prompt;
      let result = {};
  
      // Check if the item name already exists in the SeenItem model
      const seenItem = await SeenItem.findOne({ name: result.name });
  
      if (seenItem) {
        // If the item name exists, populate the fields from the SeenItem model
        result.icon = seenItem.icon;
        result.expiry = seenItem.expiry;
        result.tags = seenItem.tags;
        result.isFrozen = seenItem.isFrozen;
      } else {
        result = await ingredientAgent(prompt);
      }
  
      res.status(200).json({ result });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

exports.promptImage = async (req, res) => {
    try {
      const result = await imageAgent.generateRecipeImage(req.body.desc);
      res.status(200).json({ result });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
