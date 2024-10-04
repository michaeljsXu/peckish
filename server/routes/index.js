const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const itemRouter = require('./itemRouter');
const recipeRouter = require('./recipeRouter');


router.use('/item', itemRouter);
router.use('/recipe', recipeRouter);
router.get('/', indexController.home);

module.exports = router;