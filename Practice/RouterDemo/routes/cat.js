const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("All cat");
});

router.post("/", (req, res) => {
  res.send("Creating cat");
});

router.get("/:id", (req, res) => {
  res.send("View cat");
});

router.get("/:id/edit", (req, res) => {
  res.send("Edit cat");
});

module.exports = router;
