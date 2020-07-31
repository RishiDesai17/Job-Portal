const express = require('express');
const router = express.Router();
const TokenController = require('../controllers/refreshAccessTokens');

router.post('/', TokenController.refresh)

module.exports = router;