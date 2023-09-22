import React, { useEffect, useState } from "react";
import "../Pagescss/Cart.css";
import returnIcon from "../assets/return.svg";
import tickIcon from "../assets/tick.svg";
import { message } from "antd";
import { RxCross2 } from "react-icons/rx";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Modal } from "antd";
import Footer from "../components/Footer";
import Copyright from "../components/Copyright";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const [preventUser, setPreventUser] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [deliveryDate, setDeliveryDate] = useState(null);

  const navigate = useNavigate();

  //success notification
  const success = (message) => {
    messageApi.open({
      type: "success",
      content: message,
    });
  };

  //error notification
  const error = (message) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };

  //warning notification
  const warning = (message) => {
    messageApi.open({
      type: "warning",
      content: message,
    });
  };

  const increaseOrderQuantity = (bookId, userId) => {
    if (!preventUser) {
      axios
        .post(
          "/increase-cart-quantity",
          {
            bookId,
            userId,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setPreventUser(false);
          if (res.data.success) {
            dispatch({ type: "setBooksData", payload: res.data.sendItem });
            dispatch({ type: "setResult", payload: res.data.sendItem });
          } else {
            error("Maximum 10 orders allowed at a time");
          }
        })
        .catch((err) => {
          setPreventUser(false);
          console.log(err);
        });
    }
  };

  const decreaseOrderQuantity = (bookId, userId) => {
    if (!preventUser) {
      axios
        .post(
          "/decrease-cart-quantity",
          {
            bookId,
            userId,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setPreventUser(false);
          if (res.data.success) {
            dispatch({ type: "setBooksData", payload: res.data.sendItem });
            dispatch({ type: "setResult", payload: res.data.sendItem });
          } else {
            error("cart quantity can't be less than 1");
          }
        })
        .catch((err) => {
          setPreventUser(false);
          console.log(err);
        });
    }
  };

  const dispatch = useDispatch();

  //getting booksData state from redux store
  const booksData = useSelector((state) => {
    return state.booksData;
  });

  //getting userData state from redux store
  const userData = useSelector((state) => {
    return state.userData;
  });

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [firstName, setFirstName] = useState(
    userData ? userData.firstName : ""
  );
  const [lastName, setLastName] = useState(userData ? userData.lastName : "");
  const [email, setEmail] = useState(userData ? userData.email : "");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [note, setNote] = useState("");
  // const [orders, setOrders] = useState([]);

  const showModal = (modal) => {
    modal(true);
  };

  const handleCancel = (modal) => {
    modal(false);
  };

  const handlePayNow = (e) => {
    e.preventDefault();
    console.log("first");
    let orders = [];
    const filteredBooksData = booksData?.filter((book) => {
      return book.cart.some((book) => book.user === userData?._id);
    });
    filteredBooksData.forEach((book) => {
      orders.push({
        firstName,
        lastName,
        email,
        mobileNumber,
        address,
        state,
        zip,
        city,
        note,
        bookImage: book.image,
        bookPrice: book.originalPrice,
        bookName: book.bookName,
        quantity: book.cart.filter((book) => {
          return book.user === userData?._id;
        })[0].quantity,
        status: "Confirmed",
        userId: userData._id,
      });
    });

    if (userData) {
      if (!preventUser) {
        setPreventUser(true);
        setSpinner(true);
        console.log(orders);
        axios
          .post(
            "/orders",
            {
              orders,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            console.log(res);
            setPreventUser(false);
            setSpinner(false);
            handleCancel(setIsCheckoutModalOpen);
            setFirstName("");
            setLastName("");
            setEmail("");
            setMobileNumber("");
            setAddress("");
            setState("");
            setZip("");
            setCity("");
            setNote("");
            if (res.data.success) {
              success("your order placed successfully");
              dispatch({ type: "setBooksData", payload: res.data.sendItem });
              dispatch({ type: "setResult", payload: res.data.sendItem });
            }
          })
          .catch((err) => {
            setPreventUser(false);
            setSpinner(false);
            handleCancel(setIsCheckoutModalOpen);
            setFirstName("");
            setLastName("");
            setEmail("");
            setMobileNumber("");
            setAddress("");
            setState("");
            setZip("");
            setCity("");
            setNote("");
            console.log(err);
            error("Internal Server Error");
          });
      }
    } else {
      error("Please login your account");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get("/user-auth")
      .then((res) => {
        if (res.data.success) {
          dispatch({ type: "setUser", payload: res.data.userDetails });

          const currentDate = new Date(); // Getting the current date

          // Adding 7 days to the current date
          const sevenDaysFromToday = new Date(
            currentDate.getTime() + 7 * 24 * 60 * 60 * 1000
          );

          const dayOfMonth = sevenDaysFromToday.getDate(); // Getting the day of the month
          // const month = currentDate.toLocaleString('default', { month: 'long' }); // Get the full month name
          const month = sevenDaysFromToday.toLocaleString("default", {
            month: "short",
          }); // Getting the short month name
          const year = sevenDaysFromToday.getFullYear(); // Getting the year

          setDeliveryDate(`${dayOfMonth} ${month} ${year}`);
        } else {
          error("Please login your account");
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const removeFromCart = (item, user) => {
    if (userData) {
      if (!preventUser) {
        setPreventUser(true);
        axios
          .post(
            "/remove-from-cart",
            {
              item,
              user,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            setPreventUser(false);
            if (res.data.success) {
              dispatch({ type: "setBooksData", payload: res.data.sendItem });
              dispatch({ type: "setResult", payload: res.data.sendItem });
            }
          })
          .catch((err) => {
            setPreventUser(false);
            console.log(err);
            error("Internal Server Error");
          });
      }
    } else {
      error("Please login your account");
    }
  };

  const filteredBooksData = booksData?.filter((book) => {
    return book.cart.some((book) => book.user === userData?._id);
  }).length;

  const allBookOriginalPrices = booksData
    ?.filter((book) => {
      return book.cart.some((book) => book.user === userData?._id);
    })
    .map((book) => book.originalPrice);

  const totalPriceWithoutDiscount = allBookOriginalPrices
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    .toFixed(2);

  const allBookDiscountedPrices = booksData
    ?.filter((book) => {
      return book.cart.some((book) => book.user === userData?._id);
    })
    .map((book) => book.discountedPrice);

  const totalPriceWithDiscount = allBookDiscountedPrices
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    .toFixed(2);

  const totalDiscount = (
    totalPriceWithoutDiscount - totalPriceWithDiscount
  ).toFixed(2);

  return (
    <>
      {booksData ? (
        <div className="cart">
          {contextHolder}
          <div
            className="checkout-cards"
            style={{
              width:
                booksData.filter((book) => {
                  return book.cart.some((book) => book.user === userData?._id);
                }).length > 0
                  ? ""
                  : "100%",
            }}
          >
            {filteredBooksData > 0 ? (
              booksData
                .filter((book) => {
                  return book.cart.some((book) => book.user === userData?._id);
                })
                .map((book, index) => {
                  return (
                    <div className="checkout-card" key={book._id}>
                      <div className="check-out-image">
                        <Link to={`/${book._id}`}>
                          <img src={book.image} alt="" loading="lazy" />
                        </Link>
                      </div>
                      <div className="checkout-details">
                        <p className="cart-book-name">{book.bookName}</p>
                        <div className="cart-order-quantity">
                          <button
                            onClick={() =>
                              decreaseOrderQuantity(book._id, userData?._id)
                            }
                          >
                            <FaMinus />
                          </button>
                          <div>
                            <h4>
                              {
                                book.cart.filter((book) => {
                                  return book.user === userData?._id;
                                })[0].quantity
                              }
                            </h4>
                          </div>
                          <button
                            onClick={() =>
                              increaseOrderQuantity(book._id, userData?._id)
                            }
                          >
                            <FaPlus />
                          </button>
                        </div>
                        <div className="cart-pricing">
                          <div className="cart-bold-price">
                            $ {book.discountedPrice}
                          </div>
                          <div className="cart-strike-price">
                            ${book.originalPrice}
                          </div>
                        </div>
                        <div className="return-policy">
                          <img src={returnIcon} alt="" />
                          <p>14 days</p>
                          <span>return available</span>
                        </div>
                        <div className="delivery-date">
                          <img src={tickIcon} alt="" className="tick-icon" />
                          <span>Delivery by</span>
                          <p>{deliveryDate}</p>
                        </div>
                      </div>
                      <div
                        className="remove-cart"
                        onClick={(e) => {
                          e.preventDefault();
                          userData
                            ? removeFromCart(book._id, userData._id)
                            : removeFromCart();
                        }}
                      >
                        <RxCross2 className="remove-cart" />
                      </div>
                    </div>
                  );
                })
            ) : (
              <div className="empty-wishlist">
                <img
                  src="https://cdni.iconscout.com/illustration/premium/thumb/confusing-woman-due-to-empty-cart-4558760-3780056.png"
                  alt=""
                  loading="lazy"
                />
                <h1>Your cart is Empty!</h1>
                <h2>Add something to make me Happy!!</h2>
              </div>
            )}
          </div>
          {booksData ? (
            filteredBooksData > 0 ? (
              <div className="total-carts">
                <div className="price-details">
                  <span>PRICE DETAILS(4 ITEMS)</span>
                </div>
                <div className="total-mrp">
                  <p>Total MRP</p>
                  <span>${totalPriceWithoutDiscount}</span>
                </div>
                <div className="discount-on-mrp">
                  <p>Discount on MRP</p>
                  <span>${totalDiscount}</span>
                </div>
                <div className="coupon-discount">
                  <p>Coupon Discount</p>
                  <span>Apply Coupon</span>
                </div>
                <div className="total-amount">
                  <p>Total Amount</p>
                  <span>$ {totalPriceWithDiscount}</span>
                </div>
                <button
                  className="place-order-btn"
                  onClick={() => showModal(setIsCheckoutModalOpen)}
                >
                  Place Order
                </button>
              </div>
            ) : (
              ""
            )
          ) : (
            ""
          )}

          {/* check-out modal */}
          <Modal
            open={isCheckoutModalOpen}
            onCancel={() => handleCancel(setIsCheckoutModalOpen)}
            className="buyer-info-modal"
          >
            <form onSubmit={handlePayNow}>
              <h1 className="buyer-info">Buyer Info</h1>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />{" "}
              <br /> <br />
              <input
                type="text"
                placeholder="Last Name"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />{" "}
              <br /> <br />
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />{" "}
              <br /> <br />
              <input
                type="number"
                placeholder="Mobile Number"
                required
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />{" "}
              <br /> <br />
              <textarea
                name=""
                id=""
                cols="30"
                rows="2"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>{" "}
              <br /> <br />
              <input
                type="text"
                placeholder="State"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
              />{" "}
              <br /> <br />
              <input
                type="Number"
                placeholder="Zip / Postcode"
                required
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />{" "}
              <br /> <br />
              <input
                type="text"
                placeholder="Town / City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />{" "}
              <br /> <br />
              <textarea
                name=""
                id=""
                cols="30"
                rows="2"
                placeholder="Note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              ></textarea>
              <br /> <br />
              <button id="log-in-btn">
                <div
                  className="spinner"
                  style={{ display: spinner ? "block" : "none" }}
                ></div>
                <span style={{ display: spinner ? "none" : "block" }}>
                  Pay Now
                </span>
              </button>
            </form>
          </Modal>
        </div>
      ) : (
        ""
      )}
      <Footer />
      <Copyright />
    </>
  );
};

export default Cart;
