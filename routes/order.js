const express = require("express");
const router = express.Router();

const config = require("config");

const stripe = require("stripe")(config.get("stripeKey"));
const { v4: uuid } = require("uuid");

const Profile = require("../models/Profile");
const Product = require("../models/Product");
const Order = require("../models/Order");

const auth = require("../middleware/auth");
const { TokenExpiredError } = require("jsonwebtoken");

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

//@route GET /api/order/all
//@desc get all orders
//@access Private
router.get("/all", auth, async (req, res) => {
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

//@route PUT /api/order/payment/:orderID
//@desc order payment
//@access Private
/* router.put("/payment/:orderID", auth, async (req, res) => {
  let orderID = req.params.orderID;
  const { stripeToken } = req.body;

  try {
    let profile = await Profile.findOne({ _id: req.profile.id });
    if (!profile) return res.status(404).json({ msg: "Profile not found" });

    let order = await Order.findOne({ _id: orderID });
    if (!order) return res.status(404).json({ msg: "Order not found" });

    const indempontencyKey = uuid();

    let customer = await stripe.customers.create({
      email: stripeToken.email,
      source: stripeToken.id,
    });

    let result = await stripe.charges.create(
      {
        amount: order.totalAmount,
        currency: "inr",
        customer: customer.id,
      },
      { indempontencyKey }
    );

    res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
}); */

module.exports = router;
