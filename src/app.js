// IMPORT GLOBALS
const process = require('node:process');

// CREATE EXPRESS APP
const express = require('express');

const app = express();

// IMPORT USEFUL MIDDLEWARES
require('dotenv').config(); // Access ENV variables from .env file
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const passport = require('./configs/passport.config');

// IMPORT ROUTES
const routes = require('./routes/app.routes');

// CONSUME USEFUL MIDDLEWARES
app.use(express.json());
app.use(logger('dev'));
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// SET SESSION
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: { sameSite: 'strict' },
}));
app.use(passport.session());

// CONSUME ROUTES YOU HAVE IMPORTED
app.use('/', routes);

// DEFINE HOSTNAME & PORT
const port = process.env.PORT || 3000;

// SERVE REACT APP AS STATIC FOLDER FOR PRODUCTION
app.use(express.static('../client/dist'));

// START LISTENING TO REQUESTS W/ EXPRESS SERVER APP
app.listen(port, () => console.warn(`Server running http://localhost:${port}/`));
