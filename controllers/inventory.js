const Inventory = require('../model/inventory');

exports.createItem = async (req, res) => {
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





// const Inventory = require('../model/inventory.js');

// // controllers/inventory.js
// exports.createItem = async (req, res) => {
//     try {
//         if (!req.session.user?.id) { // Changed from userId to user.id
//             return res.status(401).json({ error: 'Unauthorized' });
//         }

//         const newItem = new Inventory({
//             ...req.body,
//             createdBy: req.session.user.id // Match session structure
//         });

//         const savedItem = await newItem.save();
//         res.status(201).json(savedItem);
//     } catch (error) {
//         console.error('Error creating item:', error);
//         res.status(400).json({ 
//             error: error.message,
//             details: error.errors 
//         });
//     }
// };

// // Get all inventory items
// exports.getInventory = async (req, res) => {
//     try {
//         const items = await Inventory.find({ createdBy: req.session.userId });
//         res.json(items);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };