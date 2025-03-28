const db = require('../util/database');

class Student {
    constructor(id, name, grade, studentId) {
        this.id = id;
        this.name = name;
        this.grade = grade;
        this.studentId = studentId;
    }

    // Save a new student to the database
    save() {
        return db.execute(
            'INSERT INTO students (name, grade, studentId) VALUES (?, ?, ?)',
            [this.name, this.grade, this.studentId]
        );
    }

    // Update an existing student
    update() {
        return db.execute(
            'UPDATE students SET name = ?, grade = ?, studentId = ? WHERE id = ?',
            [this.name, this.grade, this.studentId, this.id]
        );
    }

    // Delete a student by ID
    static delete(id) {
        return db.execute('DELETE FROM students WHERE id = ?', [id]);
    }

    // Fetch all students from the database with profile pictures
    static fetchAll() {
        return db.execute(
            'SELECT s.*, u.profile_picture ' +
            'FROM students s ' +
            'LEFT JOIN users u ON s.name = u.name ' +
            'ORDER BY s.id'
        );
    }

    // Find a student by ID with profile picture
    static findById(id) {
        return db.execute(
            'SELECT s.*, u.profile_picture ' +
            'FROM students s ' +
            'LEFT JOIN users u ON s.name = u.name ' +
            'WHERE s.id = ?',
            [id]
        );
    }
}

module.exports = Student;