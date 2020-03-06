const mongoose = require("mongoose");

require("dotenv-safe").config({
  example: process.env.CI ? ".env.ci.example" : ".env.example"
});

exports.connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
  } catch (error) {
    console.log(error);
  }
  return mongoose.connection;
};
