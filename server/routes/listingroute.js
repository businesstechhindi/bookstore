const express = require("express");
const router = express.Router();
const listing = require("../models/listing");
const {
  allBooks,
  bookDetails,
  addToWishlist,
  removeFromWishlist,
  addToCart,
  removeFromCart,
  moveToCart,
  addToMyOrders,
  increaseCartQuantity,
  decreaseCartQuantity,
  getAllOrders
} = require("../controllers/listingcontroller");

router.get("/all-books", allBooks);
router.post("/single-book", bookDetails);
router.post("/add-to-wishlist", addToWishlist);
router.post("/remove-from-wishlist", removeFromWishlist);
router.post("/add-to-cart", addToCart);
router.post("/remove-from-cart", removeFromCart);
router.post("/move-to-cart", moveToCart);
router.post("/orders", addToMyOrders);
router.post("/increase-cart-quantity", increaseCartQuantity);
router.post("/decrease-cart-quantity", decreaseCartQuantity);
router.get("/get-all-orders", getAllOrders);

module.exports = router;
