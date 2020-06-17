const mongoose = require("mongoose");

const ProductCategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("productCategory", ProductCategorySchema);
