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

    // Fetch all students from the database
    static fetchAll() {
        return db.execute('SELECT * FROM students');
    }

    // Find a student by ID
    static findById(id) {
        return db.execute('SELECT * FROM students WHERE id = ?', [id]);
    }
}

module.exports = Student;