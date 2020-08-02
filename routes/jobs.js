const express = require('express');
const router = express.Router();
const JobsController = require('../controllers/jobs');
const checkAuth = require('../middleware/check-auth');

router.post('/createjob', checkAuth, JobsController.createJob);

module.exports = router;