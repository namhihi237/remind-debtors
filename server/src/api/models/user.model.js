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
  status: {
    type: String,
    default: "low"
  }
});
module.exports = mongoose.model("User", userSchema, "user");
