const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const isAuth = require('../middleware/is-auth');
const hasRole = require('../middleware/has-role');

// Public routes
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);
router.get('/logout', authController.logout);
router.post('/theme', authController.setTheme);

// Admin routes - protected with role-based access control
router.get('/admin/dashboard', isAuth, hasRole('admin'), authController.getAdminDashboard);
router.get('/admin/users', isAuth, hasRole('admin'), authController.getUsersList);
router.get('/admin/users/:userId/roles', isAuth, hasRole('admin'), authController.getUserRoles);
router.post('/admin/users/:userId/roles', isAuth, hasRole('admin'), authController.updateUserRoles);

module.exports = router;