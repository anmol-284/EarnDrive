const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../Auth/Auth'); // Middleware for authentication

// Import controllers
const { register, login, logout } = require('../controllers/user');
const { postbike } = require('../controllers/bike');
const { payment } = require('../controllers/payment');

// Define routes
router.post("/login", login);
router.post("/signup", register);
router.post("/logout", logout);
router.post('/bike', authenticateUser, postbike);
router.get('/get_payment', payment);

module.exports = router;
