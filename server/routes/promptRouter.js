const express = require('express');
const router = express.Router();
const promptController = require('../controllers/promptController');

// Route to handle output from chatbot to user
router.get('/prompt', promptController.userIn);

// Route to handle prompt to chatbot from user
router.post('/prompt', promptController.userOut);

module.exports = router;