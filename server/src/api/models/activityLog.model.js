const mongoose = require("mongoose");
const activitySchema = new mongoose.Schema({
  payBookId: {
    type: mongoose.Schema.Types.ObjectId
  },
  debtorsId: {
    type: mongoose.Schema.Types.ObjectId
  },
  timeRemid: {
    type: Array,
    default: []
  },
  count: {
    type: Number,
    default: 0
  }
});
module.exports = mongoose.model("Activity", activitySchema, "activity");
