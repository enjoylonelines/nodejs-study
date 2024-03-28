const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    (email, password, done) => {
      // done이 app.post에서 호출하는 콜백함수
      User.findOne(
        {
          email: email.toLocaleLowerCase(),
        },
        (err, user) => {
          if (err) return done(err);
          if (!user) {
            return done(null, false, { msg: `Email ${email} not found` });
          }
          user.comparePassword(password, (err, isMatch) => {
            if (err) return done(err);
            if (isMatch) return done(null, user);
            return done(null, false, { msg: "Invalid email or password." });
          });
        }
      );
    }
  )
);
