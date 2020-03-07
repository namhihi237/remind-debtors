const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  exist: {
    type: Number,
    default: 0
  },
  phone: {
    type: String
  }
});
module.exports = mongoose.model("User", userSchema, "user");
