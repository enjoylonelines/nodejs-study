const express = require("express");

const app = express();
const port = 5555;

app.get("/", (req, res) => {
  res.send("/, GET");
});

app.post("/", (req, res) => {
  res.send("/, POST");
});

app.listen(port, () => {
  console.log(`listen to ${port} ...`);
});
