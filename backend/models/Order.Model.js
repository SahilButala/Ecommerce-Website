import mongoose from "mongoose";

const Order_Model = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  cartId: String,
  cartItems: [
    {
      productId: String,
      title: String,
      image: String,
      price: Number,
      saleprice: Number,
      quantity : Number
    },
  ],
  addressInfo: {
    addressId: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String,
  },
  orderStatus: String,
  paymentMethod: String,
  paymentStatus: String,
  totalAmount: Number,
  orderDate: Date,
  orderUpdateDate: Date,
  paymentId: String,
  payerId: String,
});


const Order_Schema = mongoose.model.Order || mongoose.model("Order",Order_Model)

export default Order_Schema
