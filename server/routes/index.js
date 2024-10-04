const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const itemRouter = require('./itemRouter');
const recipeRouter = require('./recipeRouter');
const userRouter = require('./userRouter');
const prommptRouter = require('./promptRouter');

router.use('/item', itemRouter);
router.use('/recipe', recipeRouter);
router.use('/user', userRouter);
router.use('/prompt', prommptRouter)
router.get('/', indexController.home);

module.exports = router;