const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');
const isAuth = require('../middleware/is-auth');
const hasRole = require('../middleware/has-role');

router.get('/', (req, res) => {
    res.render('index', {
        isLoggedIn: req.session.isLoggedIn,
        username: req.session.username,
        user: req.session.user || null,
        theme: req.cookies.theme || 'light',
        csrfToken: req.csrfToken ? req.csrfToken() : null
    });
});

// Student list - accessible to all authenticated users
router.get('/students', isAuth, studentController.getStudents);

// Student management - restricted to teachers and admins
router.get('/students/add', isAuth, hasRole(['teacher', 'admin']), studentController.addStudent);
router.post('/students/add', isAuth, hasRole(['teacher', 'admin']), studentController.createStudent);
router.get('/students/edit/:id', isAuth, hasRole(['teacher', 'admin']), studentController.editStudent);
router.post('/students/edit/:id', isAuth, hasRole(['teacher', 'admin']), studentController.updateStudent);
router.get('/students/delete/:id', isAuth, hasRole(['teacher', 'admin']), studentController.deleteStudent);

module.exports = router;