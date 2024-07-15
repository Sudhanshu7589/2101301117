const express = require("express");
const router = express.Router();

const { getAllProducts, createProduct } = require("../controllers/product");


router.post("/createProduct",createProduct);
router.get("/getAllProducts",getAllProducts);



module.exports = router;
