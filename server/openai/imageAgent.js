require('dotenv').config();
const OpenAI = require('openai');
 
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate a recipe image based on its description.
 * @param {string} description - The description of the recipe.
 * @returns {Promise<string>} - The URL of the generated image.
 */
async function generateRecipeImage(description) {
  try {
    const response = await openai.images.generate({
      model: "dall-e-2",
      prompt: description,
      n: 1,
      size: '512x512',
    });

    const imageUrl = response.data[0].url;
    return imageUrl;
  } catch (error) {
    console.error('Error generating recipe image:', error);
    throw new Error('Failed to generate recipe image');
  }
}

module.exports = { generateRecipeImage };