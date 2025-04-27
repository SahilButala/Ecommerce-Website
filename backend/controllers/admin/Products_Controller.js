import { imageUploadhandlerUtil } from "../../helper/Cloudinary.js";
import Product_Schema from "../../models/Product.model.js";

const handleImageUploader = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");

    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadhandlerUtil(url);

    res.json({
      sucess: true,
      result,
    });
  } catch (error) {
    res.json({
      sucess: false,
      message: error.message,
    });
  }
};

const addNewProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      saleprice,
      totalStock,
    } = req.body;

    const product = new Product_Schema({
      image,
      title,
      description,
      category,
      brand,
      price,
      saleprice,
      totalStock,
    });

    await product.save();

    res.status(201).json({
      sucess: true,
      message: "Product created successfully....",
      product,
    });
  } catch (error) {
    res.json({
      sucess: false,
      message: error.message,
    });
  }
};
const DeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product_Schema.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        sucess: false,
        message: "product not found",
      });
    }

    return res.json({
      sucess: true,
      message: "product delete successfully...",
      id
    });
  } catch (error) {
    res.json({
      sucess: false,
      message: error.message,
    });
  }
};
const updateExsisteingProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      saleprice,
      totalStock,
    } = req.body;

    const { id } = req.params;

    const UpdateProduct = await Product_Schema.findById(id);

    if (!UpdateProduct) {
      return res.status(404).json({
        sucess: false,
        message: "product not found",
      });
    }

    UpdateProduct.title = title || UpdateProduct.title;
    UpdateProduct.description = description || UpdateProduct.description;
    UpdateProduct.category = category || UpdateProduct.category;
    UpdateProduct.brand = brand || UpdateProduct.brand;
    UpdateProduct.image = image || UpdateProduct.image;
    UpdateProduct.price = price || UpdateProduct.price;
    UpdateProduct.saleprice = saleprice || UpdateProduct.saleprice;
    UpdateProduct.totalStock = totalStock || UpdateProduct.totalStock;

    await UpdateProduct.save();

    res.status(200).json({
      sucess: true,
      message: "your product updated successfully..",
      product: {
        id: UpdateProduct._id, 
        title: UpdateProduct.title,
        description: UpdateProduct.description,
        category: UpdateProduct.category,
        brand: UpdateProduct.brand,
        image: UpdateProduct.image,
        price: UpdateProduct.price,
        saleprice: UpdateProduct.saleprice,
        totalStock: UpdateProduct.totalStock,
      },
    });
  } catch (error) {
    res.json({
      sucess: false,
      message: error.message,
    });
  }
};
const getAllProducts = async (req, res) => {
  try {
    const products = await Product_Schema.find({});

    if (!products) {
      return res.json({
        sucess: false,
        message: "products cant empty ",
      });
    }

    return res.status(200).json({
      sucess: true,
      message: "your products",
      products,
    });
  } catch (error) {
    res.json({
      sucess: false,
      message: error.message,
    });
  }
};

export {
  handleImageUploader,
  addNewProduct,
  DeleteProduct,
  getAllProducts,
  updateExsisteingProduct,
};
