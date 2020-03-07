require("dotenv-safe").config({
  example: process.env.CI ? ".env.ci.example" : ".env.example"
});
const app = require("./src/config/express");
const mongoose = require("./src/config/mongoose");
mongoose.connect();
app.listen(process.env.PORT, () =>
  console.log(`Server started port ${process.env.PORT}`)
);
