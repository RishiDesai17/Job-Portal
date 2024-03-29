const express = require('express');
const router = express.Router();
const JobsController = require('../controllers/jobs');
const checkAuth = require('../middleware/check-auth');

router.get('/', JobsController.getAllJobs)

router.get('/:jobid', JobsController.getJob)

router.get('/details/public/:jobid', JobsController.getJobDetailsPublic)

router.get('/details/:jobid', checkAuth, JobsController.getJobDetails)

router.get('/filter', JobsController.getJobsByDomain)

router.post('/createjob', checkAuth, JobsController.createJob);

router.post('/apply', checkAuth, JobsController.apply);

router.get('/applicants/:jobid', checkAuth, JobsController.getApplicants)

router.get('/shortlist/:jobid', checkAuth, JobsController.getShortlisted)

router.post('/shortlist', checkAuth, JobsController.shortlist);

router.get('/select/:jobid', checkAuth, JobsController.getSelected);

router.post('/select', checkAuth, JobsController.select);

module.exports = router;