const express = require("express");
const shelterRoutes = require("./routes/shelter");
const catRoutes = require("./routes/cat");
const app = express();

app.use("/shelters", shelterRoutes);
app.use("/cats", catRoutes);

app.listen(3000, () => {
  console.log("Serving app on localhost");
});
