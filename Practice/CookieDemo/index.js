const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser("thisissecret"));

app.get("/greet", (req, res) => {
  console.log(req.cookies);
  res.send("Hi there");
});

app.get("/setname", (req, res) => {
  res.cookie("name", "this is my demo cookie");
  res.send("Ok I have sent you a cookie");
});

app.get("/getsignedcookie", (req, res) => {
  res.cookie("mysignedcookie", "this is secret", { signed: true });
  res.send("Ok I have sent you a signed cookie");
});

app.listen(3000, () => {
  console.log("Serving");
});
