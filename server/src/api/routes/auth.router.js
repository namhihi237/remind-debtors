const authController = require("../controllers/auth.controller");
const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/login", authController.login);
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google"),
  authController.googleCallback
);
router.get("/logout", authController.logout);

module.exports = router;
