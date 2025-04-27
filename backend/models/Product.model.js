import mongoose from "mongoose";

const Product_Model = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },

    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    saleprice: {
      type: Number,
      required: true,
    },
    totalStock: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);


const Product_Schema = mongoose.model.product || mongoose.model('Product',Product_Model)

export default Product_Schema