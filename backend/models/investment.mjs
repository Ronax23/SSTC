import mongoose from 'mongoose';

const baseOptions = {
    discriminatorKey: 'assetType',
    timestamps: true
};

const investmentBaseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim:true
    },
    investedAmount: {
        type: Number,
        required: true,
        min: 0
    },
    investmentDate: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String,
        trim: true
    }
}, baseOptions);

export const Investment = mongoose.model('Investment', investmentBaseSchema);