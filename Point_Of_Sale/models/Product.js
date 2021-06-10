const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: String,
  unitprice: Number,
  description: String,
  quantity: Number,
  image: String,
});

module.exports = mongoose.model("Product", ProductSchema);
