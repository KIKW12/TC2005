const User = require('../models/user.model');
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
                req.session.isLoggedIn = true;
                req.session.user = loadedUser;
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
            }
            res.render('login', { error: 'Usuario o contraseña inválidos' });
        })
        .catch(err => {
            console.error('Error en login:', err);
            res.render('login', { error: 'Error al iniciar sesión. Inténtelo nuevamente.' });
        });
};

exports.getSignup = (req, res) => {
    res.render('signup', { error: null });
};

exports.postSignup = (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    
    // Basic validation
    if (password !== confirmPassword) {
        return res.render('signup', { error: 'Las contraseñas no coinciden' });
    }
    
    // Check if user exists
    User.findByEmail(email)
        .then(existingUser => {
            if (existingUser) {
                return res.render('signup', { error: 'El correo ya está registrado' });
            }
            
            // Create new user
            const user = new User(null, name, email, password);
            return user.save();
        })
        .then(result => {
            res.redirect('/login');
        })
        .catch(err => {
            console.error('Error al registrar usuario:', err);
            res.render('signup', { error: 'Error al crear cuenta. Inténtelo nuevamente.' });
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
                    req.session.isLoggedIn = true;
                    req.session.user = user;
                    req.session.username = user.name;
                    next();
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

exports.setTheme = (req, res) => {
    const { theme } = req.body;
    res.cookie('theme', theme, { maxAge: 365 * 24 * 60 * 60 * 1000 }); // 1 year
    res.json({ success: true });
};