// routes/admin.routes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const isAuth = require('../middleware/is-auth');
const hasRole = require('../middleware/has-role');

// GET /admin/users - View all users (requires admin role)
router.get('/admin/users', isAuth, hasRole('admin'), adminController.getUsers);

// GET /admin/user/:userId/profile-picture - Show upload form for profile picture
router.get('/admin/user/:userId/profile-picture', isAuth, hasRole('admin'), adminController.getProfilePictureForm);

// POST /admin/user/:userId/profile-picture - Process profile picture upload
router.post('/admin/user/:userId/profile-picture', isAuth, hasRole('admin'), adminController.postProfilePicture);

module.exports = router;