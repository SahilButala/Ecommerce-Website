import Review from "../../models/Review.js";
import OrderSchema from "../../models/Order.Model.js";
import Product from "../../models/Product.model.js";

const addReviewToProduct = async (req, res) => {
  try {
    const { userId, text, productId, userName, reviewValue } = req.body;

    const order = await OrderSchema.findOne({
      userId,
      "cartItems.productId": productId,
      orderStatus: "confirmed",
    });

    if (!order) {
      return res.status(403).json({
        success: false,
        message: "you need to purchase this product to review it",
      });
    }

    const CheckExsistingReview = await Review.findOne({ productId, userId });

    if (CheckExsistingReview) {
      return res.status(400).json({
        success: false,
        message: "you  already reviewed this product",
      });
    }

    const newReview = new Review({
      userId,
      text,
      productId,
      userName,
      reviewValue,
    });

    await newReview.save();

    // finding review of all selected products

    const reviews = await Review.find({ productId });
    const totalReviewsLength = reviews.length;
    const averageReview =
      reviews.reduce((sum, item) => sum + item.reviewValue, 0) /
      totalReviewsLength;

    await Product.findByIdAndUpdate(productId, { averageReview });
    res.status(201).json({
      success: true,
      data: newReview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong ",
    });
  }
};
const getAllReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({productId});
    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong ",
    });
  }
};

export {addReviewToProduct,getAllReviews}
