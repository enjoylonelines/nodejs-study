const express = require("express");
const jwt = require("jsonwebtoken");
const port = 4000;

const app = express();
const secretText = "superSecret";
const posts = [
  {
    username: "beom",
    title: "Post 1",
  },
  {
    username: "han",
    title: "post 2",
  },
];
app.use(express.json()); //바디 Json객체를 js객체로 파싱

app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = { name: username };

  const accessToken = jwt.sign(user, secretText);
  res.json({ accessToken });
});

app.get("/posts", (req, res) => {
  res.json(posts);
});
// middleware
app.listen(port, () => {
  console.log("listening on port" + port);
});
