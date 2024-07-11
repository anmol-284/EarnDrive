const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization header missing or malformed' });
    }
  
    const token = authHeader.split(' ')[1];
    console.log('Token received:', token); // Log the token for debugging
  
    const decoded = jwt.verify(token, process.env.SUPER_SECRET);
    console.log('Token decoded:', decoded); // Log the decoded token for debugging
  
    req.user = decoded; 
    next();
  } catch (error) {
    console.error('Token verification failed:', error); // Log the error for debugging
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { authenticateUser };
