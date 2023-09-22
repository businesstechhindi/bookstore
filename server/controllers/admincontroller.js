const listing = require("../models/listing");

const listBook = async () => {
  try {
    const newListing = new listing(req.body);
    const registerListing = await newListing.save();
    res.json({ success: true });
  } catch (err) {
    console.log(err);
  }
};

module.exports =  {listBook };
