const express = require("express");
const router = express.Router();

const Profile = require("../models/Profile");
const Product = require("../models/Product");
const Order = require("../models/Order");

const auth = require("../middleware/auth");

//@route POST /api/order/
//@desc place order
//@access Private
router.post("/", auth, async (req, res) => {
  const { items, deliveryAddress, paymentMethod } = req.body; //items:productIDs and quantities

  try {
    let profile = await Profile.findOne({ _id: req.profile.id });
    if (!profile) return res.status(404).json({ msg: "Profile not found" });

    let productIDs = [];

    items.forEach((item) => productIDs.push(item.productID));

    let products = await Product.find({ _id: { $in: productIDs } });

    items.forEach((item, index) => {
      let product = products.find((product) => item.productID == product._id);
      items[index].title = product.title;
      items[index].price = product.price;
      items[index].quantity = parseInt(items[index].quantity);
    });

    let totalAmount = 0;
    items.forEach((item) => {
      totalAmount += item.price * item.quantity;
    });

    let order = new Order({
      user: profile._id,
      items,
      totalAmount,
      deliveryAddress,
      paymentMethod,
    });

    await order.save();

    res.status(200).json(order._id);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

//@route GET /api/order/
//@desc get all orders
//@access Private
router.get("/", auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ _id: req.profile.id });
    if (!profile) return res.status(404).json({ msg: "Profile not found" });

    let orders = await Order.find({ user: profile._id });

    res.status(200).json(orders);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
