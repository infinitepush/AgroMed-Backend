const express = require('express');
const { uploadImage, uploadMiddleware } = require('../controllers/uploadController');
const { auth } = require('../controllers/authController'); 
const router = express.Router();

router.post('/', auth, uploadMiddleware, uploadImage);

module.exports = router;