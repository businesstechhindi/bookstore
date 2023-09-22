import React, { useEffect, useState } from "react";
import "../Pagescss/Wishlist.css";
import { Link, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import Footer from "../components/Footer";
import Copyright from "../components/Copyright";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import axios from "axios";

const Wishlist = () => {
  const [preventUser, setPreventUser] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
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

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get("/user-auth")
      .then((res) => {
        if (res.data.success) {
          dispatch({ type: "setUser", payload: res.data.userDetails });
        } else {
          error("Please login your account");
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const dispatch = useDispatch();

  //getting bookata state from redux store
  const booksData = useSelector((state) => {
    return state.booksData;
  });

  //getting userData state from redux store
  const userData = useSelector((state) => {
    return state.userData;
  });

  const removeWishlist = (item, user) => {
    if (!preventUser) {
      setPreventUser(true);
      axios
        .post(
          "/remove-from-wishlist",
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
  };

  const moveToCart = (item, user) => {
    if (!preventUser) {
      setPreventUser(true);
      axios
        .post(
          "/move-to-cart",
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
            success("Moved to cart");
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
  };

  return (
    <>
      {booksData ? (
        <div className="wishlist-div">
          {contextHolder}
          <div className="total-wishlist-items">
            <h1>
              My Wishlist{" "}
              <span className="total-items">
                {
                  booksData.filter((book) => {
                    return book.wishList.includes(userData ? userData._id : "");
                  }).length
                }{" "}
                items
              </span>
            </h1>
          </div>
          <div className="wishlist-cards">
            {booksData.filter((book) => {
              return book.wishList.includes(userData ? userData._id : "");
            }).length > 0 ? (
              booksData.map((book) => {
                return book.wishList.includes(userData ? userData._id : "") ? (
                  <div className="wishlist-card" key={book._id}>
                    <div className="item-image-div">
                      <Link to={`/${book._id}`}>
                        <img
                          src={book.image}
                          alt=""
                          className="wishlist-image"
                        />
                      </Link>
                      <div
                        className="item-remove-icon"
                        onClick={(e) => {
                          e.preventDefault();
                          userData
                            ? removeWishlist(book._id, userData._id)
                            : removeWishlist();
                        }}
                      >
                        <RxCross2 className="remove-icon" />
                      </div>
                    </div>
                    <div className="item-image-actions">
                      <div className="item-details">
                        <p className="item-book-name">{book.bookName}</p>
                        <div className="item-pricing">
                          <div className="item-price-bold">
                            $ {book.originalPrice}
                          </div>
                          <div className="item-price-strike">
                            ${book.discountedPrice}
                          </div>
                        </div>
                      </div>
                      <div className="item-action">
                        <div
                          className="move-to-cart"
                          onClick={(e) => {
                            e.preventDefault();
                            userData
                              ? moveToCart(book._id, userData._id)
                              : moveToCart();
                          }}
                        >
                          Move To Cart
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                );
              })
            ) : (
              <div className="empty-wishlist">
                <img
                  src="https://cdni.iconscout.com/illustration/premium/thumb/confusing-woman-due-to-empty-cart-4558760-3780056.png"
                  alt=""
                  loading="lazy"
                />
                <h1>Your wishlist is Empty!</h1>
                <h2>Add something to make me Happy!!</h2>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="empty-wishlist">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/confusing-woman-due-to-empty-cart-4558760-3780056.png"
            alt=""
          />
          <h1>Your wishlist is Empty!</h1>
          <h2>Add something to make me Happy!!</h2>
        </div>
      )}
      <Footer />
      <Copyright />
    </>
  );
};

export default Wishlist;
