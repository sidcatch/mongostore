const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Product = require("../models/Product");
const auth = require("../middleware/auth");

//@route POST /product/
//@desc post product
//@access Public --> SHOULD NOT BE!
router.post("/", async (req, res) => {
  const { title, amount, price, photo, category } = req.body;

  try {
    let product = new Product({ title, amount, price, photo });

    await product.save();

    res.status(200).json(product);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
