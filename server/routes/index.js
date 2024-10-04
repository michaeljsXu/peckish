const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const itemRouter = require('./itemRouter');
const recipeRouter = require('./recipeRouter');


router.use('/item', itemRouter);
router.use('/recipe', recipeRouter);
router.get('/', indexController.home);

// Routes for /users
router.use('/user', require('./userRouter'));

// Routes for /item
router.get('/item', indexController.getAllItems); // Get all items
router.get('/item/:id', indexController.getItemById); // Get a specific item by ID
router.delete('/item/:id', indexController.deleteItemById); // Delete a specific item by ID
router.put('/item/:id', indexController.updateItemById); // Update a specific item by ID
router.post('/item', indexController.createItem); // Create a new item

module.exports = router;