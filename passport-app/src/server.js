const express = require("express");
const { default: mongoose } = require("mongoose");
const path = require("path");
const app = express();

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

app.get("/signup", (req, res) => {
  res.render("signup");
});

const port = 4000;
app.listen(port, () => {
  console.log(`Listening on ${port},,,`);
});
