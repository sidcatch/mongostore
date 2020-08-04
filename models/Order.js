const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "profile" },
  items: [{ title: String, price: Number, quantity: Number }],
  totalAmount: {
    type: Number,
  },
  deliveryAddress: { type: mongoose.Schema.Types.ObjectId, ref: "address" },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  estimatedArrivalDate: {
    type: Date,
    default: Date.now,
  },
  paymentStatus: {
    type: String,
  },
  paymentMethod: {
    type: String,
  },
  status: {
    type: String,
    default: "Arriving On",
  },
  deliveryDate: {
    type: Date,
  },
});

module.exports = mongoose.model("order", OrderSchema);
