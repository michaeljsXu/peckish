// Controller function to handle output from chatbot to the user
exports.userIn = async (req, res) => {
  try {
    const prompt = req.query.prompt; // Use req.query for GET request parameters
    const result = await userIn(prompt);
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to handle the user output to the chatbot
exports.userOut = async (req, res) => {
  try {
    const result = await userOut();
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};