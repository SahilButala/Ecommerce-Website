import Product_Schema from "../../models/Product.model.js";

const getFiterProducts = async (req, res) => {
  try {
    const { brand = [], category = [], sortBy = "price-lowtohigh" } = req.query;

    let filter = {};
    if (category.length) {
      filter.category = { $in: category.split(",") };
    }
    if (brand.length) {
      filter.brand = { $in: brand.split(",") };
    }

    let sort = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;

        break;
      case "price-hightolow":
        sort.price = -1;

        break;
      case "title-atoz":
        sort.title = 1;

        break;
      case "title-ztoa":
        sort.title = -1;

        break;

      default:
        sort.price = 1;
        break;
    }

    //
    const products = await Product_Schema.find(filter).sort(sort);
    if (!products) {
      return res.status(404).json({
        message:
          "Products are not created so please create first products to display",
        success: false,
      });
    }

    res.status(200).json({
      sucess: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};

const getProductDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const ProdcutsDetails = await Product_Schema.findById(id);
    if (!ProdcutsDetails) {
      return res.status(404).json({
        sucess: false,
        message: "product not found",
      });
    }

    return res.status(200).json({
      sucess: true,
      product: ProdcutsDetails,
    });
  } catch (error) {
    res.json({
      sucess: false,
      message: error.message,
    });
  }
};

export { getProductDetailsById, getFiterProducts };
