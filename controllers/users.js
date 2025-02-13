const usersRouter = require('express').Router();
const User = require('../model/user.js');

usersRouter.post('/', async (request, response) => {
    const { name, lastName, email, password } = request.body;

    if (!name || !lastName || !email || !password) {
        return response.status(400).json({ error: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return response.status(400).json({ error: 'Email already exists' });
        }

        const newUser = new User({
            name,
            lastName,
            email,
            password
        });

        const savedUser = await newUser.save();
        response.status(201).json(savedUser);
        
    } catch (error) {
        console.error('Error saving user:', error);
        response.status(500).json({ 
            error: error.message || 'Error saving user' 
        });
    }
});

module.exports = usersRouter;