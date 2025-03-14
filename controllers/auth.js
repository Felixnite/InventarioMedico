const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');

// Add this admin-specific login route
router.post('/admin-login', async (req, res) => {
    try {
        const { password } = req.body;
        
        const adminUser = await User.findOne({ admin: true });
        if (!adminUser) {
            return res.status(404).json({ error: 'Admin account not found' });
        }

        const isMatch = await bcrypt.compare(password, adminUser.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid admin password' });
        }

        // Set session properly
        req.session.userId = adminUser._id.toString();
        req.session.user = {
            email: adminUser.email,
            role: 'admin'
        };

        res.json({ 
            success: true,
            user: {
                id: adminUser._id,
                email: adminUser.email,
                role: 'admin'
            }
        });

    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        // Set session for regular users
        req.session.userId = user._id.toString();
        req.session.user = {
            email: user.email,
            role: user.admin ? 'admin' : 'user'
        };

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