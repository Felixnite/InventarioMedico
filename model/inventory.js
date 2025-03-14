const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, 'Quantity cannot be negative']
    },
    category: {
        type: String,
        required: true,
        enum: [
            'Medicamentos',
            'Instrumentos quirurgicos',
            'Equipamiento medico',
            'Consumibles',
            'Suministros de especialidad',
            'Emergencia y trauma',
            'Equipamiento de proteccion personal', // Fixed typo
            'Suministros de laboratorio'
        ]
    },
    provider: {
        type: String,
        required: [true, 'Provider is required']
    },
    usageType: {
        type: String,
        required: true,
        enum: ['Reusable', 'Disposable']
    },
    expiryDate: {
        type: Date,
        required: [true, 'Expiry date is required']
    },
    price: {
        type: Number,
        min: [0, 'Price cannot be negative'],
        required: true
    },
    location: {
        type: String,
        required: true,
        enum: ['Pharmacy', 'Surgery', 'ICU', 'Pabellon']
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);
