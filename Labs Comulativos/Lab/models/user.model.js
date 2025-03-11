const db = require('../util/database');
const bcrypt = require('bcryptjs');

class User {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    // Save a new user to the database with password hashing
    save() {
        // Hash the password before saving
        return bcrypt.hash(this.password, 12)
            .then(hashedPassword => {
                return db.execute(
                    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
                    [this.name, this.email, hashedPassword]
                );
            });
    }

    // Find a user by email
    static findByEmail(email) {
        return db.execute('SELECT * FROM users WHERE email = ?', [email])
            .then(([rows]) => {
                if (rows.length === 0) {
                    return null;
                }
                return rows[0];
            });
    }

    // Find a user by ID
    static findById(id) {
        return db.execute('SELECT * FROM users WHERE id = ?', [id])
            .then(([rows]) => {
                if (rows.length === 0) {
                    return null;
                }
                return rows[0];
            });
    }
}

module.exports = User;