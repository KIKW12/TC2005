// controllers/admin.controller.js
const User = require('../models/user.model');
const Role = require('../models/role.model');
const fs = require('fs');
const path = require('path');

// Show all users with roles for admin
exports.getUsers = (req, res, next) => {
    User.fetchAll()
        .then(users => {
            const userPromises = users.map(user => {
                return Role.getUserRoles(user.id)
                    .then(roles => {
                        user.roles = roles;
                        return user;
                    });
            });
            return Promise.all(userPromises);
        })
        .then(usersWithRoles => {
            res.render('admin/users', {
                pageTitle: 'User Management',
                users: usersWithRoles
            });
        })
        .catch(err => {
            console.error('Error fetching users:', err);
            res.status(500).render('500', {
                pageTitle: 'Error',
                error: 'Failed to load users'
            });
        });
};

// Get profile picture upload form
exports.getProfilePictureForm = (req, res, next) => {
    const userId = req.params.userId;
    
    User.findById(userId)
        .then(user => {
            if (!user) {
                return res.redirect('/admin/users');
            }
            
            return Role.getUserRoles(userId)
                .then(roles => {
                    const userType = roles.some(role => role.name === 'teacher') ? 'Teacher' : 
                                    roles.some(role => role.name === 'student') ? 'Student' : 'User';
                    
                    res.render('admin/profile-picture', {
                        pageTitle: 'Upload Profile Picture',
                        userId: userId,
                        userName: user.name,
                        userType: userType,
                        currentPicture: user.profile_picture
                    });
                });
        })
        .catch(err => {
            console.error('Error getting user:', err);
            res.status(500).render('500', {
                pageTitle: 'Error',
                error: 'Failed to load user'
            });
        });
};

// Process profile picture upload
exports.postProfilePicture = (req, res, next) => {
    const userId = req.params.userId;
    
    // Check if file exists
    if (!req.file) {
        return res.status(422).render('admin/profile-picture', {
            pageTitle: 'Upload Profile Picture',
            userId: userId,
            errorMessage: 'Attached file is not an image or no file was selected.'
        });
    }
    
    // Get the file path
    const filePath = req.file.path;
    
    // Find the user and their current profile picture
    User.findById(userId)
        .then(user => {
            if (!user) {
                // Delete uploaded file if user not found
                fs.unlink(filePath, (err) => {
                    if (err) console.error('Error deleting file:', err);
                });
                return res.redirect('/admin/users');
            }
            
            // Delete old profile picture if exists
            if (user.profile_picture) {
                const oldFilePath = path.join(__dirname, '..', user.profile_picture);
                fs.unlink(oldFilePath, (err) => {
                    if (err && err.code !== 'ENOENT') {
                        console.error('Error deleting old profile picture:', err);
                    }
                });
            }
            
            // Update user profile picture in database
            return User.updateProfilePicture(userId, filePath)
                .then(() => {
                    res.redirect('/admin/users');
                });
        })
        .catch(err => {
            console.error('Error updating profile picture:', err);
            res.status(500).render('500', {
                pageTitle: 'Error',
                error: 'Failed to update profile picture'
            });
        });
};