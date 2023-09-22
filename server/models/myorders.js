const mongoose = require("mongoose");

const myOrdersSchema = mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  mobileNumber:{
    type:Number
  },
  address:{
    type:String
  },
  state:{
    type:String
  },
  zip:{
    type:Number
  },
  city:{
    type:String
  },
  note:{
    type:String
  },
  bookImage: {
    type: String,
  },
  bookPrice: {
    type: Number,
  },
  bookName: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  status: {
    type: String,
  },
  userId:{
    type:String
  }
});

const myOrders = mongoose.model("myOrders", myOrdersSchema);

module.exports = myOrders;
