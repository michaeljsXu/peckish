require('dotenv').config();
require('dotenv').config();
const OpenAI = require('openai');
 
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const messages = [
  {
    role: "system",
    content: `You are a helpful cooking ingredient attributes assistant. Given an item's name, you can respond with the attributes it should have. The format and required fields of your reponse is in the JSON format below. Your response must only include a valid JSON.
{
  "name": "name goes here",
  "icon": "a unicode character representing the item",
  "expiry": "expected shelf life of the item, in days",
  "tags": [
    "tag1, such as meat/vegetable", "tag2", "tag3
  ],
  "frozen": "a bool estimating if the item is usually frozen ",
  "count": "a typical amount the user might buy"
}`,
  },
];

exports.ingredientAgent = async (userInput) => {
  messages.push({
    role: "user",
    content: userInput,
  });
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: messages,
  });
  console.log(response);
  return response;
}