const express = require('express');
const router = express.Router();
const utilityController = require('../controllers/utilityController');

// Check for expired ingredients route
router.get('/getExpiredItems', utilityController.getExpiredItems);

module.exports = router;