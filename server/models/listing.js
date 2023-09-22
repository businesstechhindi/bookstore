const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  bookName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  reviews: {
    type: Number,
  },
  likes: {
    type: Number,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  publishedYear: {
    type: Number,
    required: true,
  },
  originalPrice: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
    required: true,
  },
  shippingCharges: {
    type: Number,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
  bookFormat: {
    type: String,
    require: true,
  },
  totalPages: {
    type: Number,
    require: true,
  },
  wishList: {
    type: Array,
    require: true,
  },
  cart: {
    type: Array,
    require: true,
  },
  owner: {
    type: String,
    required: true,
  },
  featured:{
    type:Boolean,
    required:true
  },
  datePublished: {
    type: Date,
    default: Date.now(),
  }
});

const listing = mongoose.model("listing", listingSchema);

module.exports = listing;
