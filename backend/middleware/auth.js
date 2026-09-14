const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    // Authorization header se token nikal
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Token nahi mila. Pehle login karo' });
    }

    // Token verify karo
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'huzef-secret-key-123');
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid ya expired token' });
  }
};

module.exports = authMiddleware;