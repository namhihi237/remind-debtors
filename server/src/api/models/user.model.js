const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 128
  },
  status: {
    type: String,
    default: "low"
  }
});
module.exports = mongoose.model("User", userSchema, "user");
