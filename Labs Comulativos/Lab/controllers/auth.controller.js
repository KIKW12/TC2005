const User = require('../models/user.model');
const Role = require('../models/role.model');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res) => {
    res.render('login', { error: null });
};

exports.postLogin = (req, res) => {
    const { email, password, remember } = req.body;
    let loadedUser;
    
    User.findByEmail(email)
        .then(user => {
            if (!user) {
                return res.render('login', { error: 'Usuario o contraseña inválidos' });
            }
            loadedUser = user;
            
            return bcrypt.compare(password, user.password);
        })
        .then(doMatch => {
            if (doMatch) {
                // Get user roles
                return Role.getUserRoles(loadedUser.id)
                    .then(roles => {
                        req.session.isLoggedIn = true;
                        req.session.user = loadedUser;
                        req.session.user.roles = roles;
                        req.session.username = loadedUser.name;
                        
                        if (remember) {
                            res.cookie('rememberMe', loadedUser.email, {
                                maxAge: 30 * 24 * 60 * 60 * 1000,
                                httpOnly: true
                            });
                        }
                        
                        return req.session.save(err => {
                            if (err) console.log(err);
                            res.redirect('/');
                        });
                    });
            }
            res.render('login', { error: 'Usuario o contraseña inválidos' });
        })
        .catch(err => {
            console.error('Error en login:', err);
            res.render('login', { error: 'Error al iniciar sesión. Inténtelo nuevamente.' });
        });
};

exports.getSignup = (req, res) => {
    // If admin is signing up a user, show role selection
    const isAdmin = req.session.isLoggedIn && 
                   req.session.user && 
                   req.session.user.roles && 
                   req.session.user.roles.some(role => role.name === 'admin');
    
    if (isAdmin) {
        Role.fetchAll()
            .then(roles => {
                res.render('signup', { 
                    error: null, 
                    roles: roles,
                    isAdmin: true
                });
            })
            .catch(err => {
                console.error('Error fetching roles:', err);
                res.render('signup', { 
                    error: 'Error fetching roles', 
                    roles: [],
                    isAdmin: true
                });
            });
    } else {
        res.render('signup', { 
            error: null,
            roles: null,
            isAdmin: false
        });
    }
};

exports.postSignup = (req, res) => {
    const { name, email, password, confirmPassword, role } = req.body;
    
    // Basic validation
    if (password !== confirmPassword) {
        return res.render('signup', { 
            error: 'Las contraseñas no coinciden',
            roles: null,
            isAdmin: false
        });
    }
    
    // Check if user exists
    User.findByEmail(email)
        .then(existingUser => {
            if (existingUser) {
                const isAdmin = req.session.isLoggedIn && 
                               req.session.user && 
                               req.session.user.roles && 
                               req.session.user.roles.some(r => r.name === 'admin');
                
                if (isAdmin) {
                    return Role.fetchAll()
                        .then(roles => {
                            return res.render('signup', { 
                                error: 'El correo ya está registrado', 
                                roles: roles,
                                isAdmin: true
                            });
                        });
                }
                
                return res.render('signup', { 
                    error: 'El correo ya está registrado',
                    roles: null,
                    isAdmin: false
                });
            }
            
            // Create new user
            const user = new User(null, name, email, password);
            
            // Determine the role to assign
            let roleToAssign = 'student'; // Default role
            
            // If role is specified and user has admin privileges, use the specified role
            if (role && req.session.isLoggedIn && 
                req.session.user && 
                req.session.user.roles && 
                req.session.user.roles.some(r => r.name === 'admin')) {
                roleToAssign = role;
            }
            
            // Save user with role
            return user.saveWithRole(roleToAssign);
        })
        .then(result => {
            res.redirect('/login');
        })
        .catch(err => {
            console.error('Error al registrar usuario:', err);
            res.render('signup', { 
                error: 'Error al crear cuenta. Inténtelo nuevamente.',
                roles: null,
                isAdmin: false
            });
        });
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Session destruction error:', err);
        }
        res.clearCookie('rememberMe');
        res.redirect('/login');
    });
};

exports.isAuth = (req, res, next) => {
    if (req.session.isLoggedIn) {
        next();
    } else if (req.cookies.rememberMe) {
        User.findByEmail(req.cookies.rememberMe)
            .then(user => {
                if (user) {
                    // Get user roles
                    return Role.getUserRoles(user.id)
                        .then(roles => {
                            req.session.isLoggedIn = true;
                            req.session.user = user;
                            req.session.user.roles = roles;
                            req.session.username = user.name;
                            next();
                        });
                } else {
                    res.redirect('/login');
                }
            })
            .catch(err => {
                console.error('Auth error:', err);
                res.redirect('/login');
            });
    } else {
        res.redirect('/login');
    }
};

// User and role management for administrators
exports.getUsersList = (req, res) => {
    User.fetchAll()
        .then(users => {
            const userPromises = users.map(user => 
                Role.getUserRoles(user.id)
                    .then(roles => {
                        user.roles = roles;
                        return user;
                    })
            );
            
            return Promise.all(userPromises);
        })
        .then(usersWithRoles => {
            res.render('admin/users', {
                pageTitle: 'User Management',
                path: '/admin/users',
                users: usersWithRoles,
                isAuthenticated: req.session.isLoggedIn,
                user: req.session.user,
                theme: req.cookies.theme || 'light'
            });
        })
        .catch(err => {
            console.error('Error fetching users:', err);
            res.status(500).render('404', {
                pageTitle: 'Error',
                path: '/admin/users',
                errorMessage: 'Error fetching users',
                isAuthenticated: req.session.isLoggedIn,
                user: req.session.user
            });
        });
};

exports.getUserRoles = (req, res) => {
    const userId = req.params.userId;
    
    Promise.all([
        User.findById(userId),
        Role.getUserRoles(userId),
        Role.fetchAll()
    ])
    .then(([user, userRoles, allRoles]) => {
        if (!user) {
            return res.status(404).render('404', {
                pageTitle: 'User Not Found',
                path: '/admin/users',
                errorMessage: 'User not found',
                isAuthenticated: req.session.isLoggedIn,
                user: req.session.user
            });
        }
        
        // Mark which roles the user has
        const rolesWithSelection = allRoles.map(role => {
            return {
                ...role,
                selected: userRoles.some(userRole => userRole.id === role.id)
            };
        });
        
        res.render('admin/edit-user-roles', {
            pageTitle: `Edit Roles: ${user.name}`,
            path: '/admin/users',
            user: user,
            roles: rolesWithSelection,
            isAuthenticated: req.session.isLoggedIn,
            currentUser: req.session.user,
            theme: req.cookies.theme || 'light'
        });
    })
    .catch(err => {
        console.error('Error fetching user roles:', err);
        res.status(500).render('404', {
            pageTitle: 'Error',
            path: '/admin/users',
            errorMessage: 'Error fetching user roles',
            isAuthenticated: req.session.isLoggedIn,
            user: req.session.user
        });
    });
};

exports.updateUserRoles = (req, res) => {
    const userId = req.params.userId;
    const { roles } = req.body;
    
    // Convert to array if single value
    const roleIds = Array.isArray(roles) ? roles : [roles].filter(Boolean);
    
    // First get all roles to determine which to add/remove
    Promise.all([
        Role.getUserRoles(userId),
        Role.fetchAll()
    ])
    .then(([currentRoles, allRoles]) => {
        const currentRoleIds = currentRoles.map(role => role.id.toString());
        const operations = [];
        
        // Remove roles that aren't in the new selection
        currentRoleIds.forEach(roleId => {
            if (!roleIds.includes(roleId)) {
                operations.push(Role.removeFromUser(userId, roleId));
            }
        });
        
        // Add roles that aren't in the current selection
        roleIds.forEach(roleId => {
            if (!currentRoleIds.includes(roleId)) {
                operations.push(Role.assignToUser(userId, roleId));
            }
        });
        
        return Promise.all(operations);
    })
    .then(() => {
        res.redirect('/admin/users');
    })
    .catch(err => {
        console.error('Error updating user roles:', err);
        res.status(500).render('404', {
            pageTitle: 'Error',
            path: '/admin/users',
            errorMessage: 'Error updating user roles',
            isAuthenticated: req.session.isLoggedIn,
            user: req.session.user
        });
    });
};

// Admin dashboard
exports.getAdminDashboard = (req, res) => {
    // Get user statistics
    let userCount = 0;
    let adminCount = 0;
    let teacherCount = 0;
    let studentCount = 0;
    let recentUsers = [];

    // Get all users with their roles
    User.fetchAll()
        .then(users => {
            userCount = users.length;
            
            // Get roles for each user
            const userPromises = users.map(user => 
                Role.getUserRoles(user.id)
                    .then(roles => {
                        user.roles = roles;
                        
                        // Count users by role
                        if (roles.some(role => role.name === 'admin')) {
                            adminCount++;
                        }
                        if (roles.some(role => role.name === 'teacher')) {
                            teacherCount++;
                        }
                        if (roles.some(role => role.name === 'student')) {
                            studentCount++;
                        }
                        
                        return user;
                    })
            );
            
            return Promise.all(userPromises);
        })
        .then(usersWithRoles => {
            // Sort by creation date (newest first) and take the 5 most recent
            recentUsers = usersWithRoles
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .slice(0, 5);
                
            res.render('admin/dashboard', {
                pageTitle: 'Admin Dashboard',
                path: '/admin/dashboard',
                userCount,
                adminCount,
                teacherCount,
                studentCount,
                recentUsers,
                isAuthenticated: req.session.isLoggedIn,
                user: req.session.user,
                theme: req.cookies.theme || 'light'
            });
        })
        .catch(err => {
            console.error('Dashboard error:', err);
            res.status(500).render('404', {
                pageTitle: 'Error',
                path: '/admin/dashboard',
                errorMessage: 'Error loading dashboard',
                isAuthenticated: req.session.isLoggedIn,
                user: req.session.user
            });
        });
};

exports.setTheme = (req, res) => {
    const { theme } = req.body;
    res.cookie('theme', theme, { maxAge: 365 * 24 * 60 * 60 * 1000 }); // 1 year
    res.json({ success: true });
};