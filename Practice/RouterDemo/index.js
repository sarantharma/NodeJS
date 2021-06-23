const express = require("express");
const app = express();

const shelterRoutes = require("./routes/shelter");
const catRoutes = require("./routes/cat");
const adminRoutes = require("./routes/admin");

app.use((req, res, next) => {
  if (req.query.isAdmin) {
    next();
  }
  res.send("Sorry not an admin!!!");
});

app.use("/shelters", shelterRoutes);
app.use("/cats", catRoutes);

app.listen(3000, () => {
  console.log("Serving app on localhost");
});
