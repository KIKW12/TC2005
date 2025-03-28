const db = require('../util/database');
const bcrypt = require('bcryptjs');
const Role = require('./role.model');

class User {
    constructor(id, name, email, password, profilePicture = null) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.profilePicture = profilePicture;
    }

    // Save a new user to the database with password hashing
    save() {
        // Hash the password before saving
        return bcrypt.hash(this.password, 12)
            .then(hashedPassword => {
                return db.execute(
                    'INSERT INTO users (name, email, password, profile_picture) VALUES (?, ?, ?, ?)',
                    [this.name, this.email, hashedPassword, this.profilePicture]
                );
            });
    }

    // Save a new user and assign a default role
    saveWithRole(roleName = 'student') {
        return this.save()
            .then(([result]) => {
                const userId = result.insertId;
                return Role.findByName(roleName)
                    .then(role => {
                        if (role) {
                            return Role.assignToUser(userId, role.id)
                                .then(() => userId);
                        }
                        return userId;
                    });
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

    // Find a user by name
    static findByName(name) {
        return db.execute('SELECT * FROM users WHERE name = ?', [name])
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

    // Update user profile picture
    static updateProfilePicture(userId, profilePicturePath) {
        return db.execute(
            'UPDATE users SET profile_picture = ? WHERE id = ?',
            [profilePicturePath, userId]
        );
    }

    // Get all users
    static fetchAll() {
        return db.execute('SELECT id, name, email, profile_picture, created_at FROM users')
            .then(([rows]) => {
                return rows;
            });
    }

    // Check if a user has a specific role
    static hasRole(userId, roleName) {
        return db.execute(
            'SELECT COUNT(*) AS count FROM user_roles ur ' +
            'JOIN roles r ON ur.role_id = r.id ' +
            'WHERE ur.user_id = ? AND r.name = ?',
            [userId, roleName]
        ).then(([rows]) => {
            return rows[0].count > 0;
        });
    }

    // Get user with roles
    static getUserWithRoles(userId) {
        let userData;
        return this.findById(userId)
            .then(user => {
                if (!user) {
                    return null;
                }
                userData = user;
                return Role.getUserRoles(userId);
            })
            .then(roles => {
                if (!userData) {
                    return null;
                }
                userData.roles = roles;
                return userData;
            });
    }
}

module.exports = User;