const mongoose = require("mongoose");

const newsLetterSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const newsLetter = mongoose.model("newsLetter", newsLetterSchema);

module.exports = newsLetter;
