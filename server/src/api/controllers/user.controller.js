const Users = require("../models/user.model");
module.exports.getInfor = (req, res, next) => {
  res.render("getInfor");
};

module.exports.postInfor = async (req, res, next) => {
  const googleId = req.signedCookies.userId;
  const phone = req.body.phone;
  try {
    await Users.findOneAndUpdate({ googleId }, { phone, exist: 1 });
    res.redirect("/paybook");
  } catch (error) {
    next(error);
  }
};
