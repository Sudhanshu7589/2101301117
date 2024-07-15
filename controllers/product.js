const product = require("../models/product");

exports.createProduct = async (req, res) => {
  try {
    const { productName, price, rating, discount, availability } = req.body;
    console.log("hiii", productName, price, rating, discount, availability);

    if (!productName || !price || !rating || !discount || !availability) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const productDetails = await product.create({
      productName,
      price,
      rating,
      discount,
      availability,
    });
    console.log(productDetails);
    return res.status(200).json({
      success: true,
      message: "product Created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const allProducts = await product.find({
      productname: true,
      price: true,
      rating: true,
      discount: true,
      availability: true,
    });

    return res.status(200).json({
      success: true,
      message: `all products fetched successfully`,
      data: allProducts,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: `Can't Fetch Product Data`,
      error: error.message,
    });
  }
};
