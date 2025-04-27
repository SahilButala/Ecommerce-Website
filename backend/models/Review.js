import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    text: {
      type: String,
      required: true,
    },
    productId: String,
    userName: String,
    reviewValue: Number,
  },
  { timestamps: true }
);

const ReviewModel =
  mongoose.model.Review || mongoose.model("Review", ReviewSchema);

export default ReviewModel;

