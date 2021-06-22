const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

const ProductSchema = new Schema({
  name: String,
  unitprice: Number,
  description: String,
  quantity: Number,
  image: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

ProductSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = mongoose.model("Product", ProductSchema);
