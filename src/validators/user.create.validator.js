const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

exports.createValidator = [
  body('firstname', 'Firstname is required and must be 2-255 characters')
    .trim().isLength({ min: 2, max: 255 }),
  body('lastname', 'Lastname is required and must be 2-255 characters')
    .trim().isLength({ min: 2, max: 255 }),
  body('username', 'Username is required and must be 5-50 characters')
    .trim().isLength({ min: 5, max: 50 }),
  body('password')
    .isLength({ min: 8, max: 50 }).withMessage('Password must be between 8 and 50 characters')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/\d/).withMessage('Password must contain at least one digit')
    .matches(/[^\w\s]/).withMessage('Password must contain at least one special character'),
  body('passwordconf')
    .exists().withMessage('Password confirmation is required')
    .custom((value, { req }) => {
      if (value !== req.body.password)
        throw new Error('Passwords do not match');
      else
        return true;
    }).withMessage('Passwords do not match'),

  // Sanitize all fields to prevent XSS attacks
  body('*').escape(),

  // PROCESS REQUEST AFTER VALIDATION & SANITIZATION
  asyncHandler(async (req, res, next) => {
    // EXTRACT VALIDATION ERRORS FROM REQUEST
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // ERROR! LET USER KNOW WHAT THE ERRORS ARE
      res.status(400).json({ errors: errors.errors });
    }
    else {
      next();
    }
  }),
];
