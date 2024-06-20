const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({error: 'Access denied. No token provided.'});
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({error: 'Invalid token.'});
  }
};

const authorizeUser = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({error: 'Access denied.'});
    }
    next();
  };
};

module.exports = {authenticateToken, authorizeUser};
