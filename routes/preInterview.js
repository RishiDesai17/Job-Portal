const express = require('express');
const router = express.Router();
const PreInterviewController = require('../controllers/preInterview');
const checkAuth = require('../middleware/check-auth');

router.post('/create', checkAuth, PreInterviewController.createInterview);

module.exports = router;