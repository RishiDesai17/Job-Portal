const express = require('express');
const router = express.Router();
const JobsController = require('../controllers/jobs');
const checkAuth = require('../middleware/check-auth');

router.get('/', JobsController.getAllJobs)

router.get('/:domain', JobsController.getAllJobs)

router.post('/createjob', checkAuth, JobsController.createJob);

router.post('/apply', checkAuth, JobsController.apply);

router.post('/shortlist', checkAuth, JobsController.shortlist);

module.exports = router;