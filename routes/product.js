const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Product = require("../models/Product");
const ProductCategory = require("../models/ProductCategory");
const auth = require("../middleware/auth");

//@route GET /api/product/
//@desc get products
//@access Public
router.get("/", async (req, res) => {
  try {
    let products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

//@route POST /api/product/
//@desc post product
//@access Public --> SHOULD BE PRIVATE!
router.post("/", async (req, res) => {
  const { title, amount, price, image, category } = req.body;

  try {
    let productCategory = await ProductCategory.findOne({ category });

    let { _id } = productCategory;

    let product = new Product({ title, amount, price, image, category: _id });

    await product.save();

    res.status(200).json(product);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

//@route POST /api/product/category
//@desc post product category
//@access Public --> SHOULD BE PRIVATE!
router.post("/category", async (req, res) => {
  const { category } = req.body;

  try {
    let productCategory = new ProductCategory({ category });

    await productCategory.save();

    res.status(200).json(productCategory);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
