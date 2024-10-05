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
    model: "chatgpt-4o-latest",
    messages: messages,
  });

  // const response = {
  //       "message": "To make a pasta dish, you'll need to purchase some ingredients. Here's a suggestion for a simple pasta recipe.",
  //       "recipe": {
  //           "name": "Pasta with Garlic and Olive Oil",
  //           "desc": "A quick and delicious pasta dish tossed with garlic and olive oil.",
  //           "ingredients": [
  //               "pasta",
  //               "garlic",
  //               "olive oil",
  //               "salt",
  //               "pepper",
  //               "parmesan cheese (optional)"
  //           ],
  //           "steps": [
  //               "Cook the pasta according to package instructions until al dente.",
  //               "While the pasta cooks, heat olive oil in a pan over medium heat.",
  //               "Add minced garlic to the oil and sauté until fragrant.",
  //               "Drain the pasta and add it to the pan with the garlic oil.",
  //               "Toss well to coat the pasta with the garlic and oil. Season with salt and pepper.",
  //               "Serve with grated parmesan cheese if desired."
  //           ],
  //           "tools": [
  //               "pan",
  //               "pot",
  //               "knife"
  //           ],
  //           "time": "15 minutes",
  //           "picture": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-VhBVR2aVz2Qx6KMqi5y0AOmV/user-dLKeNayLt6dFZL2lbsjCPA7l/img-47ZLRbzsisMruh0q1c2dz1sx.png?st=2024-10-04T18%3A58%3A42Z&se=2024-10-04T20%3A58%3A42Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-10-03T23%3A10%3A18Z&ske=2024-10-04T23%3A10%3A18Z&sks=b&skv=2024-08-04&sig=uYEVEYvIS9kHJDEOJfftgPrfBhuKLsTxZigoOqpo%2B/U%3D"
  //       }
  //   };

  let result = JSON.parse(response.choices[0].message.content);

  if (result?.recipe?.desc)
    result.recipe.picture = await imageAgent.generateRecipeImage(result.recipe.desc);
  return JSON.stringify(result);
};
