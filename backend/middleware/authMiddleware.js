const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ✅ Protect routes (check token + attach user)
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// ✅ Admin only access
const isAdmin = (req, res, next) => {
  if (req.user && req.user.type === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Admin access denied' });
  }
};

// ✅ Teacher only access
const isTeacher = (req, res, next) => {
  if (req.user && req.user.type === 'teacher') {
    next();
  } else {
    res.status(403).json({ message: 'Teacher access denied' });
  }
};

// ✅ Student only access
const isStudent = (req, res, next) => {
  if (req.user && req.user.type === 'student') {
    next();
  } else {
    res.status(403).json({ message: 'Student access denied' });
  }
};

module.exports = {
  protect,
  isAdmin,
  isTeacher,
  isStudent,
};
