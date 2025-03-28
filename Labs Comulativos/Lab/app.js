const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const multer = require('multer');
const app = express();

// Multer configuration for file uploads
const fileStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        // 'uploads': Directory where files will be stored
        callback(null, 'uploads');
    },
    filename: (request, file, callback) => {
        // Configure filename to avoid conflicts by adding timestamp
        callback(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    },
});

// Filter to limit file types
const fileFilter = (request, file, callback) => {
    if (file.mimetype == 'image/png' || 
        file.mimetype == 'image/jpg' ||
        file.mimetype == 'image/jpeg') {
            callback(null, true);
    } else {
            callback(null, false);
    }
};

app.use(express.static(path.join(__dirname, 'public')));
// Serve files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set up EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Cookie parser middleware
app.use(cookieParser());

// Body parser middleware - moving this BEFORE CSRF protection
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Multer middleware for file uploads
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('archivo'));

// Session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 24 hours
    }
}));

// CSRF protection (after session middleware AND body parser)
const csrfProtection = csrf();
app.use(csrfProtection);

// Make session data and CSRF token available to all views
app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn;
    res.locals.username = req.session.username;
    res.locals.csrfToken = req.csrfToken();
    next();
});

// Middleware for logging
app.use((request, response, next) => {
    console.log(`${request.method} ${request.url}`);
    next(); 
});

// Import route modules
const studentRoutes = require('./routes/students.routes');
const courseRoutes = require('./routes/courses.routes');
const authRoutes = require('./routes/auth.routes');
const uploadsRoutes = require('./routes/uploads.routes');
const adminRoutes = require('./routes/admin.routes');

// Theme preference cookie middleware
app.use((req, res, next) => {
    if (!req.cookies.theme) {
        res.cookie('theme', 'light', { maxAge: 365 * 24 * 60 * 60 * 1000 }); // 1 year
    }
    next();
});

// Use route modules
app.use('/', authRoutes);
app.use('/', studentRoutes);
app.use('/', courseRoutes);
app.use('/', uploadsRoutes);
app.use('/', adminRoutes);

// 404 handler - must be after all other routes
app.use((request, response, next) => {
    response.status(404).render('404', { 
        path: request.path 
    });
});

// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
