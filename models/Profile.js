const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,
    required: true
  },
  addresses: [
    {
      type: String
    }
  ],
  defaultAddress: {
    type: mongoose.Schema.Types.ObjectId
  },
  dateJoined: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("profile", ProfileSchema);
