const mongoose = require("mongoose");
const payBookSchema = new mongoose.Schema({
  creditorsId: {
    // Id chu no
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user"
  },
  content: {
    type: String
  },
  // debtorsId: {
  //   // id nguoi no
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: "user"
  // },
  money: {
    type: Number
  },
  name: {
    type: String
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
  }
});
module.exports = mongoose.model("PayBook", payBookSchema, "paybook");
