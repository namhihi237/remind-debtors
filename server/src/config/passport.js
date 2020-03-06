require("dotenv-safe").config({
  example: process.env.CI ? ".env.ci.example" : ".env.example"
});

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const Users = require("../api/models/user.model");

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENTID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback"
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const exitstingUser = await Users.findOne({ googleId: profile.id });
        if (exitstingUser) {
          return done(null, exitstingUser);
        }
        const user = await new Users({
          googleId: profile.id,
          email: profile.emails[0].value,
          name: profile.name.familyName + " " + profile.name.givenName,
          status: "low"
        }).save();
        done(null, user);
      } catch (error) {}
    }
  )
);
