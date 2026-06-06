import { Investment } from '../models/investment.mjs';
import mongoose from 'mongoose';

// 🏦 Fixed Deposit (FD) & Recurring Deposit (RD)
export const FixedDeposit = Investment.discriminator('FD', new mongoose.Schema({
    bankName: { type: String, required: true },
    interestRate: { type: Number, required: true },
    investmentDuration:{type:Number,required:true,min:1,max:200*365},
    maturityDate: { type: Date, required: true },
    payputFrequency: { type: String,enum: ['Monthly', 'Quarterly', 'Half-Yearly', 'Annually', 'At Maturity'], default: true }
}));

export const RecurringDeposit = Investment.discriminator('RD', new mongoose.Schema({
    bankName: { type: String, required: true },
    monthlyInstallment: { type: Number, required: true },
    interestRate: { type: Number, required: true },
    maturityDate: { type: Date, required: true }
}));

// 📈 Stocks & Mutual Funds
export const Stock = Investment.discriminator('STOCK', new mongoose.Schema({
    companyName: { type: String, required: true, uppercase: true }, // e.g., "RELIANCE" or "AAPL"
    quantity: { type: Number, required: true, min: 0 },
    avgBuyPrice: { type: Number, required: true },
    category:{type:String,enum:['Hybrid','Equity','ELSS','Debt'],require:true}
}));

export const MutualFund = Investment.discriminator('MUTUAL_FUND', new mongoose.Schema({
    fundName: { type: String, required: true },
    unitsHeld: { type: Number,min:0 },
    investedAmount:{type:Number,required:true,min:0},
    avgNav: { type: Number, required: true } 
}));

// 🪙 Crypto & Digital Assets
export const Crypto = Investment.discriminator('CRYPTO', new mongoose.Schema({
    coinType: { type: String, required: true, uppercase: true }, // e.g., "ETH", "BTC"
    quantity: { type: Number, required: true,min:0 },
    avgBuyPrice: { type: Number, required: true,min:0 },
}));

// 👑 Gold
export const Coins = Investment.discriminator('COINS', new mongoose.Schema({
    coinType: { type: String, enum: ['GOLD','SILVER','PLATINUM'], required: true }, // Sovereign Gold Bond, Digital, Coins/Jewelry
    weightInGrams: { type: Number, required: true },
    price:{type:Number,required:true},
    purityKarat: { type: Number} // Applicable for physical gold
}));

// 🧾 Corporate & Government Bonds
export const Bond = Investment.discriminator('BOND', new mongoose.Schema({
    bondName: { type: String, required: true }, // e.g., "NHAI" or Corporate Entity
    intrestRate: { type: Number, required: true }, // Annual interest paid
    payoutFrequency: { type: String, enum: ['Monthly', 'Quarterly', 'Half-Yearly', 'Annually', 'At Maturity'], required: true },
    maturityDate: { type: Date, required: true }
}));

MutualFund.pre('save',(next)=>{
    if(this.isModified("investedAmount")&&this.isModified('avgNav'))
    {
        if(investedAmount>0 && avgNav>0)
        {
            this.quantity=parseFloat((investedAmount/avgNav).toFixed(5))
        }
        else {
            this.quantity = 0;
        }
        next()
    }
})