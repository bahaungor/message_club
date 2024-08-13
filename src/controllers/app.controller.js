// IMPORT USEFUL MIDDLEWARES
const asyncHandler = require('express-async-handler');

// IMPORT DB QUERIES
const { createNewUser, getUserByUsername, getMessages, postMessage } = require('../db/queries');

// IMPORT PASSPORT CONFIG
const passport = require('../configs/passport.config');

// DEFINE FUNCTION TO FETCH DATA FROM DB & CREATE NEW USER
exports.signUpUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, username, password } = req.body;
  const user = await getUserByUsername(username);
  if (user)
    return res.status(400).json({ errors: [{ msg: 'Username already exists' }] });
  await createNewUser(firstname, lastname, username, password);
  res.json({ message: 'User created' });
});

// DEFINE ROUTE TO AUTHENTICATE USER VIA PASSPORT STRATEGY
// MAKE SURE TO FETCH THIS ROUTE WITH → { credentials: 'include' }
exports.logInUser = passport.authenticate('local', {
  successRedirect: '/isAuth',
  failureRedirect: '/isAuth',
});

// DEFINE ROUTE TO RETURN AUTHENTICATION STATUS & AUTHENTICATED USER
exports.isAuthenticated = asyncHandler(async (req, res) => {
  res.json({ auth: req.isAuthenticated(), user: req.user });
});

// DEFINE ROUTE TO UNAUTHENTICATE USER WHEN CALLED
// MAKE SURE TO FETCH THIS ROUTE WITH → { credentials: 'include' }
exports.logOutUser = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err)
      return next(err);
    res.redirect('/isAuth');
  });
});

exports.profilePage = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});

exports.getMessages = asyncHandler(async (req, res) => {
  const messages = await getMessages();
  res.json({ messages });
});

exports.postMessage = asyncHandler(async (req, res) => {
  const { title, message } = req.body;
  await postMessage(req.user.id, title, message);
  res.json({ posted: true, username: req.user.username });
});
