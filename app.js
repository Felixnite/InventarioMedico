require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const usersRouter = require('./controllers/users'); // Match the filename
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const authRouter = require('./controllers/auth.js'); // Adjust the path if necessary
const session = require('express-session');



(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL); // Remove deprecated options
        console.log('Conectado MongoDB');
    } catch (error) {
        console.log(error);
    }
})();

// Middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors(
    {origin: 'http://localhost:3000',
    credentials: true}
));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'secureAdminPass123',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true in production with HTTPS
}));

// Frontend routes
app.use('/', express.static(path.resolve('views', 'landing')));
app.use('/components', express.static(path.resolve('views', 'components')));
app.use('/registro', express.static(path.resolve('views', 'registro')));
app.use('/login', express.static(path.resolve('views', 'login')));
app.use('/staff-home', express.static(path.resolve('views', 'staff-home')));
app.use('/img', express.static(path.resolve('img')));
app.use('/servicios', express.static(path.resolve('views','servicios')));
app.use('/instalaciones', express.static(path.resolve('views','facilities')));
app.use('/iniciativas', express.static(path.resolve('views','iniciativas')));


// Backend routes
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
module.exports = app;