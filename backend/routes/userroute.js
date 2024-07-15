const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../Auth/Auth'); // Middleware for authentication

// Import controllers
const { register, login, logout } = require('../controllers/user');
const { postbike, getBikes } = require('../controllers/bike');
const { createOrder, verifyPayment, getKey } = require('../controllers/payment');


// Define routes
router.post("/login", login);
router.post("/signup", register);
router.post("/logout", logout);
router.post('/bike', authenticateUser, postbike);
router.post('/create-order', createOrder);
router.post('/paymentverification', verifyPayment);
router.get('/bikes' ,getBikes);
router.get('/getkey' ,getKey);

module.exports = router;
