const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE)
  .then((res) => console.log("connection successful"))
  .catch((err) => console.log(err));
