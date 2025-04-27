import Feature_Schema from "../../models/Features_model.js";

const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;

    const newImage = new Feature_Schema({
      image,
    });

    await newImage.save();

    res.status(201).json({
      success: true,
      data: newImage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getFeatureImages = async (req, res) => {
  try {
    const images = await Feature_Schema.find({});

    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {getFeatureImages,addFeatureImage}
