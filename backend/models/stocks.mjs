import mongoose, { Schema } from "mongoose";

const masterItemSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Item name is required"],
      trim: true,
      unique: true,
    },
    sku: {
      type: String,
      trim: true,
      uppercase: true,
    },
    // Optional on updates — only set during initial creation if provided
    metric: {
      type: String,
      enum: ["kg", "g", "l", "ml", "pcs"],
      default: "pcs",
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    // Only logged during inventory inward; not required for existing items
    purchasePrice: {
      type: Number,
      min: [0, "Price cannot be negative"],
      default: 0,
    },
    mrp: {
      type: Number,
      min: [0, "MRP cannot be negative"],
      default: 0,
    },
    taxRate: {
      type: Number,
      default: 0,
    },
    currentStock: {
      type: Number,
      default: 0,
      min: [0, "Stock cannot be negative"],
    },
    minStockAlert: {
      type: Number,
      default: 5,
    },
  },
  { timestamps: true }
);

const MasterItem = mongoose.models.MasterItem || mongoose.model("MasterItem", masterItemSchema);
export default MasterItem;