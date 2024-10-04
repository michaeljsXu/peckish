const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.get('/', indexController.home);

// Routes for /item
router.get('/item', indexController.getAllItems);
router.post('/item', indexController.createItem);

module.exports = router;