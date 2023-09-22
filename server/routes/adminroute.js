const express = require("express");
const router = express.Router();
const listing = require("../models/listing");
const {listBook }= require("../controllers/admincontroller");

router.get("/admin", (req, res) => {
  res.send("hello from admin");
});

router.post("/list-book", listBook);

module.exports = router;
