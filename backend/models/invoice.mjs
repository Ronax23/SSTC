import mongoose,{ Schema } from "mongoose";

const invoiceSchema=Schema({
    invoiceNumber:{type:Number,required:true,unique:true},
    date:{type:Date,default:Date.now},
    customerName:{type:String,required:true},
    items:[{
        item:{type:String,required:true},
        quantity:{type:Number,required:true},
        tax:{type:Number,required:true},
        price:{type:Number,required:true},
        subtotal:{type:Number,required:true}
    }],
    grandAmount:{type:Number,required:true},
})

const invoiceModel= mongoose.model("invoices",invoiceSchema);

export default invoiceModel;