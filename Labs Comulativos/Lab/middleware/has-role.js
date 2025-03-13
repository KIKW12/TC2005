// filepath: middleware/has-role.js
const User = require('../models/user.model');

/**
 * Middleware to check if user has specified role(s)
 * @param {string|string[]} roles - Role or array of roles to check
 * @returns {function} - Express middleware
 */
module.exports = (roles) => {
    // Convert single role to array
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        // First make sure user is authenticated
        if (!req.session.isLoggedIn || !req.session.user) {
            return res.status(401).redirect('/login');
        }

        const userId = req.session.user.id;
        
        // Check each required role
        const rolePromises = roles.map(role => User.hasRole(userId, role));
        
        Promise.all(rolePromises)
            .then(results => {
                // If any role check returns true, allow access
                if (results.some(hasRole => hasRole)) {
                    return next();
                }
                
                // No matching roles, access denied
                return res.status(403).render('404', {
                    pageTitle: 'Access Denied',
                    path: req.url,
                    errorMessage: 'You do not have permission to access this resource',
                    isAuthenticated: req.session.isLoggedIn,
                    user: req.session.user
                });
            })
            .catch(err => {
                console.error(err);
                return res.status(500).render('404', {
                    pageTitle: 'Error',
                    path: req.url,
                    errorMessage: 'An error occurred while checking permissions',
                    isAuthenticated: req.session.isLoggedIn,
                    user: req.session.user
                });
            });
    };
};