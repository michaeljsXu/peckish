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
    //return "https://oaidalleapiprodscus.blob.core.windows.net/private/org-VhBVR2aVz2Qx6KMqi5y0AOmV/user-dLKeNayLt6dFZL2lbsjCPA7l/img-47ZLRbzsisMruh0q1c2dz1sx.png?st=2024-10-04T18%3A58%3A42Z&se=2024-10-04T20%3A58%3A42Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-10-03T23%3A10%3A18Z&ske=2024-10-04T23%3A10%3A18Z&sks=b&skv=2024-08-04&sig=uYEVEYvIS9kHJDEOJfftgPrfBhuKLsTxZigoOqpo%2B/U%3D";
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: description,
      n: 1,
      size: '1024x1024',
    });

    const imageUrl = response.data[0].url;
    return imageUrl;
  } catch (error) {
    console.error('Error generating recipe image:', error);
    throw new Error('Failed to generate recipe image');
  }
}

module.exports = { generateRecipeImage };