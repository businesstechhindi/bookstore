const listing = require("../models/listing");
const myOrders = require("../models/myorders");
const allBooks = async (req, res) => {
  try {
    const allBooks = await listing.find({});
    res.status(201).json({ success: true, allBooks });
  } catch (err) {
    console.log(err);
  }
};

const bookDetails = async (req, res) => {
  try {
    const bookDetails = await listing.findById(req.body.book_id);
    if (bookDetails) {
      res.status(201).json({ success: true, bookDetails });
    }
  } catch (err) {
    res.status(400).json({ error: true, err });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const { user, item } = req.body;
    const book = await listing.findById(item);
    if (!book.wishList.includes(user)) {
      const updateListing = await listing.findByIdAndUpdate(item, {
        wishList: [...book.wishList, user],
      });
      const sendItem = await listing.find({});
      res.json({ success: true, sendItem });
    }
  } catch (err) {
    console.log(err);
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { user, item } = req.body;
    const book = await listing.findById(item);
    const updatedBook = book.wishList.filter((book) => !book.includes(user));
    const updateListing = await listing.findByIdAndUpdate(item, {
      wishList: updatedBook,
    });
    const sendItem = await listing.find({});
    res.json({ success: true, sendItem });
  } catch (err) {
    console.log(err);
  }
};

const addToCart = async (req, res) => {
  try {
    const { user, item } = req.body;
    const book = await listing.findById(item);
    const getBook = book.cart.filter((book) => book.user === user);
    if (getBook.length === 0) {
      const updateListing = await listing.findByIdAndUpdate(item, {
        cart: [...book.cart, { quantity: 1, user }],
      });
      const sendItem = await listing.find({});
      res.json({ success: true, sendItem });
    } else {
      const sendItem = await listing.find({});
      res.json({ success: true, sendItem });
    }
  } catch (err) {
    console.log(err);
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { user, item } = req.body;
    const book = await listing.findById(item);
    const updatedBook = book.cart.filter((book) => book.user !== user);
    const updateListing = await listing.findByIdAndUpdate(item, {
      cart: updatedBook,
    });
    sendItem = await listing.find({});
    res.json({ success: true, sendItem });
  } catch (err) {
    console.log(err);
  }
};
const moveToCart = async (req, res) => {
  try {
    const { user, item } = req.body;
    const book = await listing.findById(item);
    const getBook = book.cart.filter((book) => book.user === user);
    if (getBook.length === 0) {
      const removeFromWishlist = book.wishList.filter(
        (book) => !book.includes(user)
      );
      const updateListing = await listing.findByIdAndUpdate(item, {
        cart: [...book.cart, { quantity: 1, user }],
        wishList: removeFromWishlist,
      });
      sendItem = await listing.find({});
      res.json({ success: true, sendItem });
    } else {
      const removeFromWishlist = book.wishList.filter(
        (book) => !book.includes(user)
      );
      const updateListing = await listing.findByIdAndUpdate(item, {
        wishList: removeFromWishlist,
      });
      sendItem = await listing.find({});
      res.json({ success: true, sendItem });
    }
  } catch (err) {
    console.log(err);
  }
};

const increaseCartQuantity = async (req, res) => {
  try {
    const { bookId, userId } = req.body;
    const getBook = await listing.findById(bookId);
    const getFilteredBook = getBook.cart.filter((book) => book.user === userId);
    const getAllFilteredBook = getBook.cart.filter((book) => {
      return book.user !== userId;
    });

    if (getFilteredBook[0].quantity < 10) {
      getFilteredBook[0].quantity += 1;

      const updateQuantity = await listing.findByIdAndUpdate(bookId, {
        cart: [...getAllFilteredBook, getFilteredBook[0]],
      });
      const sendItem = await listing.find({});
      res.json({ success: true, sendItem });
    } else {
      res.json({ error: true });
    }
  } catch (err) {
    console.log(err);
  }
};

const decreaseCartQuantity = async (req, res) => {
  try {
    const { bookId, userId } = req.body;
    const getBook = await listing.findById(bookId);
    const getFilteredBook = getBook.cart.filter((book) => book.user === userId);
    const getAllFilteredBook = getBook.cart.filter((book) => {
      return book.user !== userId;
    });

    if (getFilteredBook[0].quantity > 1) {
      getFilteredBook[0].quantity -= 1;

      const updateQuantity = await listing.findByIdAndUpdate(bookId, {
        cart: [...getAllFilteredBook, getFilteredBook[0]],
      });
      const sendItem = await listing.find({});
      res.json({ success: true, sendItem });
    } else {
      res.json({ error: true });
    }
  } catch (err) {
    console.log(err);
  }
};

const addToMyOrders = async (req, res) => {
  try {
    const userToRemove = req.body.orders[0].userId;

    const addOrder = await myOrders.insertMany(req.body.orders);
    const updateListing = await listing.updateMany(
      { "cart.user": userToRemove },
      { $pull: { cart: { user: userToRemove } } }
    );
    const sendItem = await listing.find({});
    res.json({ success: true, sendItem });
  } catch (err) {
    console.log(err);
  }
};

const getAllOrders = async (req,res) => {
  try {
    const orders = await myOrders.find({});
    res.json({ success: true, orders });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
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
};
