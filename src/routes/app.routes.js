// CREATE EXPRESS ROUTER
const express = require('express');

const router = express.Router();

// IMPORT CONTROLLER MODULES
const { signUpUser, logInUser, logOutUser, isAuthenticated, profilePage, getMessages, postMessage } = require('../controllers/app.controller');

// IMPORT MIDDLEWARES
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');

// IMPORT VALIDATORS
const { createValidator } = require('../validators/user.create.validator');
const { messageValidator } = require('../validators/message.submit.validator');

// CREATE ROUTES TO CALL CERTAIN CONTROLLER FUNCTIONS ON CERTAIN REQUESTS
router.post('/sign-up', createValidator, signUpUser, logInUser);
router.post('/log-in', logInUser);
router.get('/isAuth', isAuthenticated);
router.get('/log-out', logOutUser);
router.get('/profile', isAuth, profilePage);
router.get('/message', isAuth, getMessages);
router.post('/message', isAuth, messageValidator, postMessage);

// EXPORT ROUTER
module.exports = router;
