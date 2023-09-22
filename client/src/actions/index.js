const addToCart = (payload) => {
  return {
    type: "addtocart",
    payload
  };
};

const removeItemFromCart = (payload) => {
  return {
    type: "removeitemfromcart",
    payload
  };
};

const addToWishList = (payload) => {
  return {
    type: "addtowishlist",
    payload
  };
};

const removeItemFromWishlist = (payload) => {
  return {
    type: "removeitemfromwishlist",
    payload
  };
};

const incrementCart = () => {
  return {
    type: "incrementcart",
  };
};

const decrementCart = () => {
  return {
    type: "decrementcart",
  };
};

const addUser = (payload)=>{
  return{
    type:"adduser",
    payload
  }
}

export {
  addToCart,
  removeItemFromCart,
  addToWishList,
  removeItemFromWishlist,
  incrementCart,
  decrementCart,
  addUser
};
