const Joi = require("joi");
module.exports.productSchema = Joi.object({
  product: Joi.object({
    name: Joi.string().required(),
    unitprice: Joi.number().required().min(0),
    description: Joi.string().required(),
    quantity: Joi.number().required().min(0),
    image: Joi.string().required(),
  }).required(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(0).max(5),
    body: Joi.string().required(),
  }).required(),
});
