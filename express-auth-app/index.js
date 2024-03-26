const cookieParser = require("cookie-parser");
const express = require("express");
const jwt = require("jsonwebtoken");
const port = 4000;

const app = express();
const secretText = "superSecret";
const refreshSecretText = "superSuperSecret";
const refreshTokens = [];
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
app.use(cookieParser()); //쿠키 파싱
// 토큰 생성
app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = { name: username };

  const accessToken = jwt.sign(user, secretText, { expiresIn: "20s" });
  const refreshToken = jwt.sign(user, refreshSecretText, { expiresIn: "1d" });
  refreshTokens.push(refreshToken);

  res.cookie("jwt", refreshToken, {
    //옵션
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({ accessToken });
});

app.get("/posts", authMiddleware, (req, res) => {
  res.json(posts);
});

// middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  // 토큰이 왔으면 유효성 확인
  jwt.verify(token, secretText, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.get("/refresh", (req, res) => {
  // cookies >> parsing >> req.cookies
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(403);

  const refreshToken = cookies.jwt;
  // refreshToken 존재 검사
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  // 유효성 검사
  jwt.verify(refreshToken, refreshSecretText, (err, user) => {
    if (err) return res.sendStatus(403);

    const accessToken = jwt.sign({ name: user.name }, secretText, {
      expiresIn: "1h",
    });
    res.json({ accessToken });
  });
});

app.listen(port, () => {
  console.log("listening on port" + port);
});
