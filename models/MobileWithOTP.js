const mongoose = require("mongoose");

const MobileWithOtp = new mongoose.Schema({
  mobile: {
    type: Number
  },
  oneTimePassword: {
    type: Number
  }
});

MobileWithOtp.index({ mobile: 1 }, { unique: true });

module.exports = mongoose.model("mobileWithOtp", MobileWithOtp);
