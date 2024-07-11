const express = require('express');
const { listBikeWithImage } = require('../controllers/fileUpload');
const { authenticateUser } = require('../Auth/Auth'); // Middleware for authentication
const { document1,document2,document3 } = require('../controllers/document');

const router = express.Router();

router.post('/listBike', authenticateUser, listBikeWithImage);
router.post('/document1', authenticateUser, document1);
router.post('/document2', authenticateUser, document2);
router.post('/document3', authenticateUser, document3);

module.exports = router;
