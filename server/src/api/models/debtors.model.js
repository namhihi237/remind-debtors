const mongoose = require("mongoose");
const debtorsSchema = new mongoose.Schema({
  email: {
    type: String
  },
  phone: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "low"
  },
  count: {
    type: Number, // so lan no chua tra
    default: 0
  }
});
module.exports = mongoose.model("Debtors", debtorsSchema, "debtors");
