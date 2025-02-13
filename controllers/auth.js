const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');

// Add this admin-specific login route
router.post('/admin-login', async (req, res) => {
    try {
        const { password } = req.body;
        
        // 1. Find the admin user
        const adminUser = await User.findOne({ admin: true });
        if (!adminUser) {
            return res.status(404).json({ error: 'Admin account not found' });
        }

        // 2. Validate password
        const isMatch = await bcrypt.compare(password, adminUser.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid admin password' });
        }

        // 3. Create admin session
        req.session.user = {
            id: adminUser._id,
            email: adminUser.email,
            role: 'admin'
        };

        res.json({ 
            success: true,
            user: req.session.user
        });

    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Single login route
router.post('/login', async (req, res) => {
    console.log('Login request:', req.body);
    
    try {
        const { email, password } = req.body;
        
        // 1. Find user by email
        const user = await User.findOne({ email });
        console.log('User found:', user);

        if (!user) {
            console.log('User not found');
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // 2. Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', isMatch);

        if (!isMatch) {
            console.log('Password does not match');
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // 3. Return success response
        console.log('Login successful');
        res.json({ 
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.admin ? 'admin' : 'user'
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;