const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.get('/', indexController.home);
router.use('/item', itemRouter);
router.use('/recipe', recipeRouter);

module.exports = router;