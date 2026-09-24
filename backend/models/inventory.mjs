import mongoose,{Schema} from 'mongoose';

const inventoryItemSchema = new mongoose.Schema({
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
        type: String,
        enum: ['kg', 'g', 'l', 'ml', 'pcs'],
        required: true,
        trim: true
    }
}, { 
    timestamps: true ,_id:false
});
 const inventorySchema=Schema({
    invoiceNumber:{type:Number,required:true,unique:true},
    date:{type:Date,default:Date.now},
    ownerFirmName:{type:String,required:true},
    ownerFirmAddress:{type:String, required:true},
    ownerFrimState:{type:String,required:true},
    ownerGSTIN:{type:String,trim: true, uppercase: true},
    sellerFirmName:{type:String,required:true},
    sellerGSTIN:{type:String,trim: true, uppercase: true},
    sellerFrimState:{type:String},
    sellerFirmAddress:{type:String},
    sellerFirmState:{type:String},
    items:{type:[inventoryItemSchema]},
    grandAmount:{type:Number,required:true},
    paymentMethod:{type:String, enum:['card','cash','netbanking','online','credit'],required:true}
 })
inventorySchema.post("save", async function (doc) {
  try {
    const stockIncrements = doc.items.map((entry) =>
      MasterItem.findOneAndUpdate(
        { name: entry.name.trim() },
        {
          $inc: { currentStock: entry.quantity },
          $set: { purchasePrice: entry.price, mrp: entry.mrp },
          $setOnInsert: {
            metric: entry.metric || "pcs",
            description: entry.description || "",
          },
        },
        { upsert: true, new: true }
      )
    );

    await Promise.all(stockIncrements);
  } catch (error) {
    console.error("Critical: Failed to add stock after purchase save:", error);
  }
});
const Inventory = mongoose.model('Inventory', inventorySchema);

export default Inventory;