import mongoose from "mongoose";

const Address_Model = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Address_Schema =
  mongoose.model.address || mongoose.model("Address", Address_Model);

export default Address_Schema;
