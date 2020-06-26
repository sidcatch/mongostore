const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  /*   description: {
    type: String,
  }, */
  /*   options: [
    {
      option: String,
      price: { type: Number, require: true },
    },
  ], */
  amount: String,
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductCategory",
  },
  /*   rating: {
    type: Number,
  },
  reviews: [
    {
      profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
      rating: Number,
      review: String,
    },
  ], */
  IsAvailable: {
    type: Boolean,
    default: true,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("product", ProductSchema);
