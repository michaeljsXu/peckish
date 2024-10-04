const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const itemRouter = require('./itemRouter');
const recipeRouter = require('./recipeRouter');

router.get('/', indexController.home);
router.use('/item', itemRouter);
router.use('/recipe', recipeRouter);

module.exports = router;