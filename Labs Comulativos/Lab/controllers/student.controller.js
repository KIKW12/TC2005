const Student = require('../models/student.model');

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
    
    newStudent.save()
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
            if (rows.length > 0) {
                res.render('edit_student', { student: rows[0] });
            } else {
                res.status(404).send('Estudiante no encontrado');
            }
        })
        .catch(err => {
            console.error('Database error:', err);
            res.status(500).send('Error retrieving student from database');
        });
};

exports.updateStudent = (req, res) => {
    const studentId = parseInt(req.params.id);
    
    const student = new Student(
        studentId,
        req.body.name,
        req.body.grade,
        req.body.studentId
    );
    
    student.update()
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