require('dotenv').config();
const userContext = require('../common/userContext');
const itemContext = require('../common/itemContext');
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
 


const messages = [
  {
    role: "system",
    content: `You are a helpful recipe assistant. You can create recipes based on the user's profile and inventory. Respond with a JSON object in the following format, note that recipe can be empty if the user is asking for suggestions, IE you do not have to generate a recipe every time. Your response must only include a valid JSON.
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
  messages.push(
    {
      role: "system",
      content: "Here are the context about the user:\n"+userContext(),
    }
  )
  messages.push(
    {
      role: "system",
      content: "Here are the user's items available:\n"+itemContext(),
    }
  )
  let isAvailbleString = "Only use ingredients available to the user. ";
  if (!useAvailable) {
    isAvailbleString = "You may use ingredients not available to the user as long as some of the user's ingredients will be used. ";
  }
  isAvailbleString += "Common ingredients such as salt/pepper/oil are always available.";
  messages.push({
    role: "system",
    content: isAvailbleString,
  })
  messages.push({
    role: "user",
    content: userInput,
  });

  console.log(messages);
  return;
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: messages,
  });
  console.log(response);
  return response;
}