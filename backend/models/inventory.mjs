import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        default: ""
    },
    MRP: {
        type: Number,
        required: true,
        min: 0
    },
    Metric: {
        enum: ['kg', 'g', 'l', 'ml', 'pcs'],
        required: true,
        trim: true
    }
}, { 
    timestamps: true 
});

const Inventory = mongoose.model('Inventory', inventorySchema);

export default Inventory;