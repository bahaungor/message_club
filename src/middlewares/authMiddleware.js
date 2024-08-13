// DEFINE AUTHORIZATION MIDDLEWARE
exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  }
  else {
    res.status(401).json({ message: 'You are not authorized!' });
  }
};

// DEFINE ADMIN MIDDLEWARE
exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === 'admin') {
    next();
  }
  else {
    res.status(401).json({ message: 'Only admin can access here!' });
  }
};
