const User = require("../models/user.model");
module.exports = {
  loggedIn: async (req, res, next) => {
    if (!req.signedCookies.userId) {
      res.redirect("/");
      return;
    }
    const user = await User.findOne({ googleId: req.signedCookies.userId });
    if (!user) {
      res.redirect("/");
      return;
    }
    res.locals.user = user;
    next();
  }
};
