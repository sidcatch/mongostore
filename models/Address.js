const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  mobile: {
    type: Number,
    required: true,
  },
  pincode: {
    type: Number,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("address", AddressSchema);
