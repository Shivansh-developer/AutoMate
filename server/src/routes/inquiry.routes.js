const express = require('express');
const router = express.Router();
const { createInquiry, getInquiries } = require('../controller/inquiry.controller');

router.post('/', createInquiry);
router.get('/', getInquiries);

module.exports = router;