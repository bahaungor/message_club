const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

exports.messageValidator = [
  body('title', 'Tite is required and must be 2-30 characters')
    .trim().isLength({ min: 2, max: 30 }),
  body('message', 'Message is required and must be 2-300 characters')
    .trim().isLength({ min: 2, max: 300 }),

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
