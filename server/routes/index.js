const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.get('/', indexController.home);

// Routes for /item
router.get('/items', indexController.getAllItems); // Get all items
router.get('/item/:id', indexController.getItem); // Get a specific item by ID
router.delete('/item/:id', indexController.deleteItem); // Delete a specific item by ID
router.put('/item/:id', indexController.updateItem); // Update a specific item by ID
router.post('/item', indexController.createItem); // Create a new item


module.exports = router;