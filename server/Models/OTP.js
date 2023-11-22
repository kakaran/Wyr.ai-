const mongoose = require("mongoose");

const OTPSchema = mongoose.Schema({
  Email: {
    type: String,
    required: true,
  },
  OTP: {
    type: Number,
    required: true,
  },
  expireTime: {
    type: Number,
    required: true,
  },
});

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;
