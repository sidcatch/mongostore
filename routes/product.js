const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Product = require("../models/Product");
const ProductCategory = require("../models/ProductCategory");
const auth = require("../middleware/auth");

//@route GET /api/products/
//@desc get products
//@access Public
router.get("/", async (req, res) => {
  try {
    let products = await Product.find();
    res.status(200).json({ products });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

//@route GET /api/products/category/:category
//@desc get products by category
//@access Public
router.get("/category/:category", async (req, res) => {
  try {
    let category = req.params.category.replace(/-/g, " ");
    let { page } = req.query;
    if (!page || page < 1) page = 1;
    let itemsPerPage = 10;

    let productCategory = await ProductCategory.findOne({ category });
    if (!productCategory) {
      return res.status(404).json({ msg: "Category not found" });
    }

    let totalProducts = await Product.find({
      category: productCategory._id,
    }).countDocuments();

    let products = await Product.find({ category: productCategory._id })
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage);

    res.status(200).json({ products, totalProducts, itemsPerPage });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

//@route GET /api/products/search
//@desc get products by searching
//@access Public
router.get("/search", async (req, res) => {
  try {
    let { page, q } = req.query;
    if (!page || page < 1) page = 1;
    let itemsPerPage = 10;

    if (!q) {
      return res.status(404).json({ msg: "search query is required" });
    }

    let totalProducts = await Product.find({
      $text: { $search: q },
    }).countDocuments();

    let products = await Product.find({
      $text: { $search: q },
    })
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage);

    res.status(200).json({ products, totalProducts, itemsPerPage });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

//@route POST /api/product/
//@desc post product
//@access Public --> SHOULD BE PRIVATE!
/* router.post("/", async (req, res) => {
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
}); */

//@route POST /api/product/category
//@desc post product category
//@access Public --> SHOULD BE PRIVATE!
/* router.post("/category", async (req, res) => {
  const { category } = req.body;

  try {
    let productCategory = new ProductCategory({ category });

    await productCategory.save();

    res.status(200).json(productCategory);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
}); */

module.exports = router;
