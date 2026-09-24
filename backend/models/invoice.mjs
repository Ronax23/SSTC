import mongoose,{ Schema } from "mongoose";
const invoiceItemSchema = new Schema(
    {
        item: { 
            type: String, 
            required: [true, "Item description is required"], 
            trim: true 
        },
        quantity: { 
            type: Number, 
            required: [true, "Quantity is required"], 
            min: [1, "Quantity must be at least 1"] 
        },
        price: { 
            type: Number, 
            required: [true, "Price is required"], 
            min: [0, "Price cannot be negative"] 
        },
        taxRate: { 
            type: Number, 
            default: 0, 
            min: [0, "Tax rate cannot be negative"] 
        },
        subtotal: { 
            type: Number, 
            required: true, 
            default: 0 
        }
    },
    { _id: false } // Prevents generating unnecessary _id for every item entry
);

const invoiceSchema=Schema({
    invoiceNumber:{type:Number,required:true,unique:true},
    date:{type:Date,default:Date.now},
    ownerFirmName:{type:String,required:true},
    ownerFirmAddress:{type:String, required:true},
    ownerFrimState:{type:String,required:true},
    ownerGSTIN:{type:String,trim: true, uppercase: true},
    customerName:{type:String,required:true},
    customerAddress:{type:String, required:true},
    customerState:{type:String,required:true},
    customerGSTIN:{type:String,trim: true, uppercase: true},
    customerFrimState:{type:String},
    customerFirmAddress:{type:String},
    customerFirmState:{type:String},
    items:{type:[invoiceItemSchema]},
    grandAmount:{type:Number,required:true},
    paymentMethod:{type:String, enum:['card','cash','netbanking','online','credit'],required:true}

})

invoiceSchema.pre("save", async function (next) {
  // A. Auto-Increment Invoice Number (Only for NEW documents)
  if (this.isNew && !this.invoiceNumber) {
    try {
      const counter = await CounterModel.findByIdAndUpdate(
        { _id: "invoice_number" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.invoiceNumber = counter.seq;
    } catch (error) {
      return next(error);
    }
  }

  // B. Calculate Item Subtotals and Grand Total cleanly
  let subtotalSum = 0;
  let totalTaxSum = 0;

  this.items.forEach((entry) => {
    const baseAmount = entry.quantity * entry.price;
    const taxAmount = (baseAmount * (entry.taxRate || 0)) / 100;

    entry.subtotal = Number((baseAmount + taxAmount).toFixed(2));
    subtotalSum += baseAmount;
    totalTaxSum += taxAmount;
  });

  this.subtotalAmount = Number(subtotalSum.toFixed(2));
  this.totalTaxAmount = Number(totalTaxSum.toFixed(2));
  this.grandAmount = Number((subtotalSum + totalTaxSum).toFixed(2));

  next();
});
invoiceSchema.post("save", async function (doc) {
  try {
    const stockDecrements = doc.items.map((entry) =>
      MasterItem.findByIdAndUpdate(entry.itemId, {
        $inc: { currentStock: -entry.quantity },
      })
    );

    await Promise.all(stockDecrements);
  } catch (error) {
    console.error("Critical: Failed to deduct stock after invoice save:", error);
  }
});

const invoiceModel= mongoose.model("invoices",invoiceSchema);

export default invoiceModel;