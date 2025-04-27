import Cart from "../../models/Cart.model.js";
import Product_Schema from "../../models/Product.model.js";

const addToCart = async (req, res) => {
  try {
    const { productId, userId, quantity } = req.body;

    // validatio
    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Inavlid data providing ",
      });
    }

    const product = await Product_Schema.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found ",
      });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      // checking if product id and quantity is not present then it will push it
      cart.items.push({
        productId,
        quantity,
      });
    } else {
      // if present then will we increment the quantity + 1
      cart.items[findCurrentProductIndex].quantity += quantity;
    }
    await cart.save();

    res.status(200).json({
      success: true,
      message: "added to cart..",
      cart,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Somthing went Wrong..." || error.message,
      success: false,
    });
  }
};
const RemoveToCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice", // Fixed: typo 'saleprice'
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.productId && item.productId._id.toString() !== productId
    );

    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    const populatedCartItems = cart.items.map((item) => ({
      productId: item.productId?._id || null,
      image: item.productId?.image || null,
      title: item.productId?.title || "Product not found",
      price: item.productId?.price || null,
      salePrice: item.productId?.salePrice || null,
      quantity: item.quantity,
    }));

    return res.status(200).json({
      success: true,
      message: "Item removed from cart.",
      data: {
        ...cart._doc,
        items: populatedCartItems,
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong...",
    });
  }
};

const fetchAllCartItems = async (req, res) => {
  try {
    const {userId} = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    const fetchCart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price saleprice",
    });

    if (!fetchCart) {
      return res.status(404).json({
        success: false,
        message: "not items are present in cart",
      });
    }

    const validCartItems = fetchCart.items.filter(
      (productItem) => productItem.productId
    );

    if (validCartItems.length < fetchCart.items.length) {
      fetchCart.items = validCartItems;
      await fetchCart.save();
    }

    const populateCartItems = validCartItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      saleprice: item.productId.saleprice,
      quantity: item.quantity,
    }));

    return res.status(200).json({
      success: true,
      data: {
        ...fetchCart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    return res.status(404).json({
      message: "Somthing went Wrong..." || error.message,
      success: false,
    });
  }
};
const updateCartItemQuantity = async (req, res) => {
  try {
    const { productId, userId, quantity } = req.body;

    // validatio
    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Inavlid data providing ",
      });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "not items are present in cart",
      });
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "cart item not present..",
      });
    }

    cart.items[findCurrentProductIndex].quantity = quantity;
    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price saleprice",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "product not found",
      price: item.productId ? item.productId.price : null,
      saleprice: item.productId ? item.productId.saleprice : null,
      quantity: item.quantity,
    }));

    return res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    return res.status(404).json({
      message: "Somthing went Wrong..." || error.message,
      success: false,
    });
  }
};

export { addToCart, RemoveToCart, fetchAllCartItems, updateCartItemQuantity };
