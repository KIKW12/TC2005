const Course = require('../models/course.model');

exports.getCourses = (req, res) => {
    Course.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('course_list', { courses: rows });
        })
        .catch(err => {
            console.error('Database error:', err);
            res.status(500).send('Error retrieving courses from database');
        });
};

exports.addCourse = (req, res) => {
    res.render('add_course');
};

exports.createCourse = (req, res) => {
    const newCourse = new Course(
        null, // ID will be assigned by database
        req.body.name,
        req.body.code,
        req.body.teacher
    );
    
    newCourse.save()
        .then(() => {
            res.redirect('/courses');
        })
        .catch(err => {
            console.error('Database error:', err);
            res.status(500).send('Error saving course to database');
        });
};

exports.getCourseDetail = (req, res, next) => {
    const courseId = parseInt(req.params.id);
    
    Course.findById(courseId)
        .then(([rows, fieldData]) => {
            if (rows.length > 0) {
                res.render('course_detail', { course: rows[0] });
            } else {
                next(); // Course not found, pass to 404 handler
            }
        })
        .catch(err => {
            console.error('Database error:', err);
            res.status(500).send('Error retrieving course from database');
        });
};