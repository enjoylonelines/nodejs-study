const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/users.model"); // 사용자 모델 경로에 따라 조정 필요

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }

        await user.comparePassword(password, (err, isMatch) => {
          if (err) return done(err);
          if (isMatch) return done(null, user);
          return done(null, false, { msg: "Invalid email or password." });
        }); // 비밀번호 비교 로직 구현 필요
      } catch (error) {
        return done(error);
      }
    }
  )
);

// 사용자 세션에 사용자 ID 저장
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// 세션에서 받은 ID로 사용자 정보 복원
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});
