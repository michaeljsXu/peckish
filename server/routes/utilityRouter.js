const express = require('express');
const router = express.Router();
const utilityController = require('../controllers/utilityController');

// Check for expired ingredients route
router.get('/getExpiredItems', utilityController.getExpiredItems);

// Remove expired ingredients
router.delete('/removeExpiredItems', utilityController.removeExpiredItems);

module.exports = router;