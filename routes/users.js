const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users');
const checkAuth = require('../middleware/check-auth');

// router.post('/signup', UsersController.users_signup)

router.post('/login', UsersController.login)

router.post('/refresh', UsersController.refresh)

// router.get('/:userId', checkAuth, UsersController.get_user)

// router.delete('/:userId', checkAuth, UsersController.users_delete_user)

// router.patch('/:userId', checkAuth, UsersController.update)

// router.post('/message', checkAuth, UsersController.message)

module.exports = router;
