const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const itemRouter = require('./itemRouter');
const recipeRouter = require('./recipeRouter');
const userRouter = require('./userRouter');

router.use('/item', itemRouter);
router.use('/recipe', recipeRouter);
router.use('/user', userRouter);
router.get('/', indexController.home);

module.exports = router;