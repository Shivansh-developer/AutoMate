const express = require('express');
const router = express.Router();
const { getCatalog, getCatalogById } = require('../controller/catalog.controller');

router.get('/', getCatalog);
router.get('/:id', getCatalogById);

module.exports = router;