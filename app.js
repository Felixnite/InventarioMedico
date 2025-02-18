require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const usersRouter = require('./controllers/users');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const authRouter = require('./controllers/auth.js');
const session = require('express-session');

// Import inventory controller
const inventoryController = require('./controllers/inventory.js');

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Conectado MongoDB');
    } catch (error) {
        console.log(error);
    }
})();

// Middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'secureAdminPass123',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Frontend routes
app.use('/', express.static(path.resolve('views', 'landing')));
app.use('/components', express.static(path.resolve('views', 'components')));
app.use('/registro', express.static(path.resolve('views', 'registro')));
app.use('/login', express.static(path.resolve('views', 'login')));
app.use('/staff-home', express.static(path.resolve('views', 'staff-home')));
app.use('/admin-home', express.static(path.resolve('views', 'admin-home')));
app.use('/img', express.static(path.resolve('img')));
app.use('/servicios', express.static(path.resolve('views','servicios')));
app.use('/instalaciones', express.static(path.resolve('views','facilities')));
app.use('/iniciativas', express.static(path.resolve('views','iniciativas')));
app.use('/admin-board', express.static(path.resolve('views','admin-board')));
app.use('/staff-board', express.static(path.resolve('views','staff-board')));

// Backend routes
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

// Inventory routes
app.post('/api/inventory', inventoryController.createItem);
app.get('/api/inventory', inventoryController.getInventory);
module.exports = app;