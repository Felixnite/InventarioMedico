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
const helmet = require('helmet');
const Inventory = require('./model/inventory');

// Database Connection

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('MongoDB connection error:', error);
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
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// app.js


app.use('/servicios', express.static(path.join(__dirname, 'views/servicios')));
app.use('/iniciativas', express.static(path.join(__dirname, 'views/iniciativas')));
app.use('/instalaciones', express.static(path.join(__dirname, 'views/facilities')));
// Static Files
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'public')));
// Frontend Routes
app.use('/', express.static(path.join(__dirname, 'views/landing')));
app.use('/components', express.static(path.join(__dirname, 'views/components')));
app.use('/components', express.static(path.join(__dirname, 'views/components')));
app.use('/registro', express.static(path.join(__dirname, 'views/registro')));
app.use('/login', express.static(path.join(__dirname, 'views/login')));
app.use('/staff-home', express.static(path.join(__dirname, 'views/staff-home')));
app.use('/admin-home', express.static(path.join(__dirname, 'views/admin-home')));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/styles.css', express.static(path.join(__dirname, 'public/styles.css')));
// Backend Routes
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

// Inventory Routes
app.post('/api/inventory', async (req, res) => {
    console.log('Session:', req.session);
    console.log('Request Body:', req.body); 
    try {
        // Verify session
        if (!req.session.userId) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        // Validate required fields
        const requiredFields = ['name', 'quantity', 'category', 'provider', 'usageType', 'expiryDate', 'price', 'location'];
        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            return res.status(400).json({
                error: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        // Create item
        const newItem = new Inventory({
            ...req.body,
            createdBy: req.session.userId
        });

        const savedItem = await newItem.save();
        res.status(201).json(savedItem);

    } catch (error) {
        res.status(400).json({
            error: error.message,
            details: error.errors ? Object.fromEntries(
                Object.entries(error.errors).map(([key, val]) => [key, val.message])
            ) : null
        });
    }
});




app.get('/api/inventory', async (req, res) => {
    try {
        // if (!req.session.userId) {
        //     return res.status(401).json({ error: 'Authentication required' });
        // }

        const items = await Inventory.find({ createdBy: req.session.userId })
            .sort({ createdAt: -1 })
            .lean();

        res.json(items);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// app.js
app.use('/src/api', express.static(path.join(__dirname, 'src/api'), {
    setHeaders: (res) => {
        res.setHeader('Content-Type', 'text/javascript');
    }
}));

app.use('/public', express.static(path.join(__dirname, 'public'), {
    setHeaders: (res) => {
        res.setHeader('Content-Type', 'text/css');
    }
}));

app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: (res) => {
        res.setHeader('Content-Type', 'text/css');
    }
}));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/landing/index.html'));
});