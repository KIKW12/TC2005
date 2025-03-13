// filepath: models/role.model.js
const db = require('../util/database');

class Role {
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    // Save a new role
    save() {
        return db.execute(
            'INSERT INTO roles (name, description) VALUES (?, ?)',
            [this.name, this.description]
        );
    }

    // Find a role by ID
    static findById(id) {
        return db.execute('SELECT * FROM roles WHERE id = ?', [id])
            .then(([rows]) => {
                if (rows.length === 0) {
                    return null;
                }
                return rows[0];
            });
    }

    // Find a role by name
    static findByName(name) {
        return db.execute('SELECT * FROM roles WHERE name = ?', [name])
            .then(([rows]) => {
                if (rows.length === 0) {
                    return null;
                }
                return rows[0];
            });
    }

    // Get all roles
    static fetchAll() {
        return db.execute('SELECT * FROM roles')
            .then(([rows]) => {
                return rows;
            });
    }

    // Assign a role to a user
    static assignToUser(userId, roleId) {
        return db.execute(
            'INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)',
            [userId, roleId]
        );
    }

    // Remove a role from a user
    static removeFromUser(userId, roleId) {
        return db.execute(
            'DELETE FROM user_roles WHERE user_id = ? AND role_id = ?',
            [userId, roleId]
        );
    }

    // Get roles for a specific user
    static getUserRoles(userId) {
        return db.execute(
            'SELECT r.* FROM roles r ' +
            'JOIN user_roles ur ON r.id = ur.role_id ' +
            'WHERE ur.user_id = ?',
            [userId]
        ).then(([rows]) => {
            return rows;
        });
    }
}

module.exports = Role;