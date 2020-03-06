module.exports = {
  login: (req, res) => {
    res.render("auth/login");
  },
  googleCallback: (req, res) => {
    res.cookie("userId", req.user.googleId, {
      maxAge: 1200000,
      httpOnly: true,
      signed: true
    });
    res.redirect("/paybook");
  },
  logout: (req, res) => {
    res.clearCookie("userId");
    res.redirect("/");
  }
};
