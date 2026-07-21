const express = require('express');
const router = express.Router();
const { getCarNews } = require('../controller/news.controller');

router.get('/', getCarNews);

module.exports = router;