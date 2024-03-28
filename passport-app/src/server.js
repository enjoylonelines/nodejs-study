const cookieSession = require("cookie-session");
const express = require("express");
const { default: mongoose } = require("mongoose");
const passport = require("passport");
const path = require("path");
const User = require("./models/users.model");
const app = express();

// cookie-session
const cookieEncryptionKey = "superSecret-key";
app.use(
  cookieSession({
    keys: [cookieEncryptionKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport");

app.use(express.json());
// form input의 value값을 받기 위한 미들웨어
app.use(express.urlencoded({ extended: false }));

//view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

mongoose
  .connect(
    `mongodb+srv://hobeom:sora2049!@passport.stzzwyu.mongodb.net/?retryWrites=true&w=majority&appName=passport`
  )
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => console.error(err));

app.use("/static", express.static(path.join(__dirname, "public")));

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.json({ msg: info });
    req.logIn(user, (err) => {
      if (err) return next(err);
      res.redirect("/");
    });
  });
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error(error);
  }
});

const port = 4000;
app.listen(port, () => {
  console.log(`Listening on ${port},,,`);
});
