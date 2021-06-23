const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("All shelter");
});

router.post("/", (req, res) => {
  res.send("Creating shelter");
});

router.get("/:id", (req, res) => {
  res.send("View shelter");
});

router.get("/:id/edit", (req, res) => {
  res.send("Edit shelter");
});

module.exports = router;
