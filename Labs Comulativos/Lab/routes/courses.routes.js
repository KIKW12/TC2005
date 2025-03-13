const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');
const isAuth = require('../middleware/is-auth');
const hasRole = require('../middleware/has-role');

// Course management - restricted to teachers and admins
router.get('/courses/add', isAuth, hasRole(['teacher', 'admin']), courseController.addCourse);
router.post('/courses/add', isAuth, hasRole(['teacher', 'admin']), courseController.createCourse);

// Courses list - accessible to all authenticated users
router.get('/courses', isAuth, courseController.getCourses);
router.get('/courses/:id', isAuth, courseController.getCourseDetail);

module.exports = router;