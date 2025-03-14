const Inventory = require('../model/inventory');

exports.createItem = async (req, res) => {
    try {
        if (!req.session.userId) {  // Make sure this matches your session structure
            return res.status(401).json({ error: 'Authentication required' });
        }

        // Rest of the code remains the same
        const newItem = new Inventory({
            ...req.body,
            createdBy: req.session.userId  // This should now work
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
};

exports.getInventory = async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const items = await Inventory.find({ createdBy: req.session.userId })
            .sort({ createdAt: -1 })
            .lean();

        res.json(items);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
