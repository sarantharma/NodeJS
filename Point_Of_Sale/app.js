const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const { productSchema, reviewSchema } = require("./schemas.js");
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");

const methodOverride = require("method-override");
const Product = require("./models/product");
const Review = require("./models/review");
// console.log(Product.findById("60c141f137faac103a5f60a5"));
// Database Connection
mongoose.connect("mongodb://localhost:27017/point-of-sale", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database Connected!");
});

const app = express();
// Boilerplate
app.engine("ejs", ejsMate);
// Templating
app.set("view engine", "ejs");
// working with file and directory paths
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

app.get("/", function (req, res) {
  res.render("home");
});

app.get(
  "/products",
  catchAsync(async (req, res) => {
    const products = await Product.find({});
    res.render("products/index", { products });
  })
);

app.get("/products/new", (req, res) => {
  res.render("products/new");
});

app.post(
  "/products",
  validateProduct,
  catchAsync(async (req, res) => {
    // console.log(req.body.product);

    const product = new Product(req.body.product);
    await product.save();
    res.redirect(`/products/${product._id}`);
  })
);

app.get(
  "/products/:id",
  catchAsync(async (req, res) => {
    const product = await Product.findById(req.params.id).populate("reviews");
    // console.log(product);
    res.render("products/show", { product });
  })
);

app.get(
  "/products/:id/edit",
  catchAsync(async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render("products/edit", { product });
  })
);

app.put(
  "/products/:id",
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, {
      ...req.body.product,
    });
    res.redirect(`/products/${product._id}`);
  })
);

app.delete(
  "/products/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect("/products");
  })
);

app.post(
  "/products/:id/reviews",
  validateReview,
  catchAsync(async (req, res) => {
    const product = await Product.findById(req.params.id);
    const review = new Review(req.body.review);
    product.reviews.push(review);
    await review.save();
    await product.save();
    res.redirect(`/products/${product._id}`);
  })
);

app.delete(
  "/products/:id/reviews/:reviewId",
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Product.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/products/${id}`);
  })
);

app.all("*", (req, res, next) => {
  next(new ExpressError("Page not found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something went wrong";
  res.status(statusCode).render("error", { err });
});

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
