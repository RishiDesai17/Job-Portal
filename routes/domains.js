const express = require('express');
const router = express.Router();
const DomainsController = require('../controllers/domains');
const checkAuth = require('../middleware/check-auth');

router.get('/', DomainsController.getDomains);

router.post('/new', checkAuth, DomainsController.newDomain)

router.patch('/:domain', checkAuth, DomainsController.editDomain)

module.exports = router;
