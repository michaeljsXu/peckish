const express = require('express');
const router = express.Router();
const promptController = require('../controllers/promptController');

// Route to handle user message input to the chatbot
router.post('/message', promptController.promptMessage);

// Route to handle new item being created and get chatbot to create attributes for it
router.post('/:item', promptController.promptItem);

module.exports = router;