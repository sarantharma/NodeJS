const express = require("express");
const shelterRoutes = require("./routes/shelter");
const app = express();

app.use("/shelters", shelterRoutes);

app.listen(3000, () => {
  console.log("Serving app on localhost");
});
