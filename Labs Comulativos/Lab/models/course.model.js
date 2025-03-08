const db = require('../util/database');

class Course {
    constructor(id, name, code, teacher) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.teacher = teacher;
    }

    // Save a new course to the database
    save() {
        return db.execute(
            'INSERT INTO courses (name, code, teacher) VALUES (?, ?, ?)',
            [this.name, this.code, this.teacher]
        );
    }

    // Fetch all courses from the database
    static fetchAll() {
        return db.execute('SELECT * FROM courses');
    }

    // Find a course by ID
    static findById(id) {
        return db.execute('SELECT * FROM courses WHERE id = ?', [id]);
    }
}

module.exports = Course;