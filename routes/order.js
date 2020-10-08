const express = require("express");
const router = express.Router();

const config = require("config");

const stripe = require("stripe")(config.get("stripeKey"));
//const { v4: uuid } = require("uuid");

const Profile = require("../models/Profile");
const Product = require("../models/Product");
const Order = require("../models/Order");

const auth = require("../middleware/auth");
//const { TokenExpiredError } = require("jsonwebtoken");

const COD = "Cash On Delivery";
const CARD = "Credit Card / Debit Card";

const getItemsWithTheirPrices = async (items) => {
  let productIDs = [];

  items.forEach((item) => productIDs.push(item.productID));

  let products = await Product.find({ _id: { $in: productIDs } });

  let itemsWithTheirPrices = [];
  items.forEach((item, index) => {
    let product = products.find((product) => item.productID == product._id);
    if (product)
      itemsWithTheirPrices.push({
        title: product.title,
        price: product.price,
        quantity: parseInt(item.quantity),
      });
    //else handle if product not found
  });

  /* let itemsWithTherePrices = items.map((item, index) => {
    let product = products.find((product) => item.productID == product._id);

    return {
      title: product.title,
      price: product.price,
      quantity: parseInt(items[index].quantity),
    };
  }); */

  return itemsWithTheirPrices;
};

const calculateOrderAmount = (items) => {
  let totalAmount = 0;
  items.forEach((item) => {
    totalAmount += item.price * item.quantity;
  });
  return totalAmount;
};

//@route POST /api/order/
//@desc place order
//@access Private
router.post("/", auth, async (req, res) => {
  const { items, deliveryAddress, paymentMethod } = req.body; //items:productIDs and quantities

  try {
    let profile = await Profile.findOne({ _id: req.profile.id });
    if (!profile) return res.status(404).json({ msg: "Profile not found" });

    /* let productIDs = [];

    items.forEach((item) => productIDs.push(item.productID));

    let products = await Product.find({ _id: { $in: productIDs } });

    items.forEach((item, index) => {
      let product = products.find((product) => item.productID == product._id);
      items[index].title = product.title;
      items[index].price = product.price;
      items[index].quantity = parseInt(items[index].quantity);
    }); */

    let itemsToOrder = await getItemsWithTheirPrices(items);

    //console.log(itemsToOrder);
    /* let totalAmount = 0;
    items.forEach((item) => {
      totalAmount += item.price * item.quantity;
    }); */

    let totalAmount = calculateOrderAmount(itemsToOrder);
    //console.log(totalAmount);

    let order = new Order({
      user: profile._id,
      items: itemsToOrder,
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

router.post("/create-payment-intent", auth, async (req, res) => {
  const { items } = req.body;

  let itemsToOrder = await getItemsWithTheirPrices(items);

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(itemsToOrder) * 100,
    currency: "inr",
  });

  res.json({
    clientSecret: paymentIntent.client_secret,
  });
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
