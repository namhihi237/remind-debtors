const mongoose = require("mongoose");
const payBookSchema = new mongoose.Schema({
  creditorsId: {
    // Id chu no
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user"
  },
  money: {
    type: Number
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  status: {
    type: String
  },
  time: {
    type: Date,
    default: new Date()
  },
  count: {
    type: Number,
    default: 1
  }
});
module.exports = mongoose.model("PayBook", payBookSchema, "paybook");
