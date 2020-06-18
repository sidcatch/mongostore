const mongoose = require("mongoose");

const ProductCategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
});

ProductCategorySchema.index({ category: 1 }, { unique: true });

module.exports = mongoose.model("productCategory", ProductCategorySchema);
