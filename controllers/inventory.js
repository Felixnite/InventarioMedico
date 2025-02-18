const Inventory = require('../model/inventory.js');

// Create new inventory item
exports.createItem = async (req, res) => {
    try {
        const newItem = new Inventory({
            ...req.body,
            createdBy: req.session.userId
        });
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all inventory items
exports.getInventory = async (req, res) => {
    try {
        const items = await Inventory.find({ createdBy: req.session.userId });
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};