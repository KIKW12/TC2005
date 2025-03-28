const Student = require('../models/student.model');
const User = require('../models/user.model');

exports.getStudents = (req, res) => {
    Student.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('student_list', { students: rows });
        })
        .catch(err => {
            console.error('Database error:', err);
            res.status(500).send('Error retrieving students from database');
        });
};

exports.addStudent = (req, res) => {
    res.render('add_student');
};

exports.createStudent = (req, res) => {
    const newStudent = new Student(
        null, // ID will be assigned by database
        req.body.name,
        req.body.grade,
        req.body.studentId
    );
    
    let profilePicturePath = null;
    if (req.file) {
        profilePicturePath = req.file.path;
    }
    
    newStudent.save()
        .then(([result]) => {
            const studentId = result.insertId;
            
            // If we have a profile picture, let's see if this student has a user account
            if (profilePicturePath) {
                return User.findByName(req.body.name)
                    .then(user => {
                        if (user) {
                            // User exists, update their profile picture
                            return User.updateProfilePicture(user.id, profilePicturePath);
                        } else {
                            // No user account exists yet, we'll create a placeholder entry in users table
                            // using just the name and profile picture (this user won't be able to log in)
                            const tempPassword = Math.random().toString(36).slice(-8); // Random string
                            const newUser = new User(
                                null,
                                req.body.name,
                                `student_${studentId}@placeholder.edu`, // Placeholder email
                                tempPassword,
                                profilePicturePath
                            );
                            return newUser.saveWithRole('student');
                        }
                    })
                    .then(() => {
                        return studentId;
                    });
            }
            return studentId;
        })
        .then(() => {
            res.redirect('/students');
        })
        .catch(err => {
            console.error('Database error:', err);
            res.status(500).send('Error saving student to database');
        });
};

exports.editStudent = (req, res) => {
    const studentId = parseInt(req.params.id);
    
    Student.findById(studentId)
        .then(([rows, fieldData]) => {
            if (rows.length === 0) {
                return res.status(404).send('Student not found');
            }
            res.render('edit_student', { 
                student: rows[0],
                csrfToken: req.csrfToken ? req.csrfToken() : null
            });
        })
        .catch(err => {
            console.error('Database error:', err);
            res.status(500).send('Error retrieving student from database');
        });
};

exports.updateStudent = (req, res) => {
    const studentId = parseInt(req.params.id);
    const updatedStudent = new Student(
        studentId,
        req.body.name,
        req.body.grade,
        req.body.studentId
    );
    
    let profilePicturePath = null;
    if (req.file) {
        profilePicturePath = req.file.path;
    }
    
    updatedStudent.update()
        .then(() => {
            // If we have a profile picture, update the user's profile picture
            if (profilePicturePath) {
                return User.findByName(req.body.name)
                    .then(user => {
                        if (user) {
                            // User exists, update their profile picture
                            return User.updateProfilePicture(user.id, profilePicturePath);
                        }
                    });
            }
            return Promise.resolve();
        })
        .then(() => {
            res.redirect('/students');
        })
        .catch(err => {
            console.error('Database error:', err);
            res.status(500).send('Error updating student in database');
        });
};

exports.deleteStudent = (req, res) => {
    const studentId = parseInt(req.params.id);
    
    Student.delete(studentId)
        .then(() => {
            res.redirect('/students');
        })
        .catch(err => {
            console.error('Database error:', err);
            res.status(500).send('Error deleting student from database');
        });
};