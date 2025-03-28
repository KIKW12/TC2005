// routes/uploads.routes.js
const express = require('express');
const router = express.Router();
const uploadsController = require('../controllers/uploads.controller');
const isAuth = require('../middleware/is-auth');

// GET /upload - Display the upload form
router.get('/upload', isAuth, uploadsController.getUploadForm);

// POST /upload - Process file upload
router.post('/upload', isAuth, uploadsController.postUpload);

module.exports = router;