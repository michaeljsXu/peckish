require("dotenv").config();
const userContext = require("../common/userContext");
const itemContext = require("../common/itemContext");
const imageAgent = require("./imageAgent");
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const messages = [
  {
    role: "system",
    content: `You are a helpful recipe assistant. You can create recipes based on the user's profile and inventory. Respond with a JSON object in the following format, note that recipe can be empty if the user is asking for suggestions, you do not have to generate a recipe every time. If there are not enough ingredients to suggest a recipe, inform the user and only respond with a message. Your response must only include a valid JSON.
{
    "message": "message for the user",
    "recipe": {
      "name": "name goes here",
      "desc": "brief description",
      "ingredients": [
        "ingredient1", "ingredient2"
      ],
      "steps": [
        "step1", "step2"
      ],
      "tools": [
        "tool1", "tool2"
      ],
      "time": "time it will take to prepare the recipe"
    }
}`,
  },
];

exports.agent = async (userInput, useAvailable) => {
  messages.push({
    role: "system",
    content:
      "Here are the context about the user:\n" +
      (await userContext.userContext()),
  });
  messages.push({
    role: "system",
    content:
      "Here are the user's items available:\n" +
      (await itemContext.itemContext()),
  });
  let isAvailbleString = "Only use ingredients available to the user. ";
  if (!useAvailable) {
    isAvailbleString =
      "The user is willing to go shopping, feel free to suggest ingredients not available. Specify which ingredients needs to be purchased. If the user wants a recipe, give one even if they don't have all the ingredients.";
  }
  isAvailbleString +=
    "Common ingredients such as salt/pepper/oil are always available. Common tools such as a stove/pan or a knife are always available. ";
  messages.push({
    role: "system",
    content: isAvailbleString,
  });
  messages.push({
    role: "user",
    content: userInput,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: messages,
  });

  let result = JSON.parse(response.choices[0].message.content);

  if (result?.recipe?.desc)
    result.recipe.picture = await imageAgent.generateRecipeImage(result.recipe.desc);
  return result;
};
