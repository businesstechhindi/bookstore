import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../Pagescss/book.css";
import { message } from "antd";
import { FaStar } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { AiFillSafetyCertificate } from "react-icons/ai";
import WhyToChoose from "../components/WhyToChoose";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import Copyright from "../components/Copyright";
import {
  BiSolidMessageDetail,
  BiSolidLike,
  BiLogoFacebook,
  BiLogoTwitter,
  BiLogoWhatsapp,
} from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
const Book = () => {
  //getting parameter of bookid
  const { book_id } = useParams();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [preventUser, setPreventUser] = useState(false);

  const dispatch = useDispatch();

  //getting booksData state from redux store
  const booksData = useSelector((state) => {
    return state.booksData;
  });

  //getting userData state from redux store
  const userData = useSelector((state) => {
    return state.userData;
  });

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
        if (res.data.success)
          dispatch({ type: "setUser", payload: res.data.userDetails });
      })
      .catch((err) => console.log(err));

    const book = booksData?.filter((book) => {
      return book._id.includes(book_id);
    });
    if (book.length === 0) {
      navigate("/error");
    }
  }, []);

  const handleWishlist = (item, user) => {
    if (userData) {
      if (!preventUser) {
        setPreventUser(true);
        if (item.wishList.includes(user)) {
          axios
            .post(
              "/remove-from-wishlist",
              {
                item: item._id,
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
                success("Removed from wishlist");
                dispatch({ type: "setBooksData", payload: res.data.sendItem });
                dispatch({ type: "setResult", payload: res.data.sendItem });
              }
            })
            .catch((err) => {
              setPreventUser(false);
              console.log(err);
              error("Internal Server Error");
            });
        } else {
          axios
            .post(
              "/add-to-wishlist",
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
                success("Added to wishlist");
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
      }
    } else {
      error("Please login your account");
    }
  };

  const handleAddToCart = (item, user) => {
    if (userData) {
      if (!preventUser) {
        setPreventUser(true);
        axios
          .post(
            "/add-to-cart",
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
              success("Added to cart");
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

  //getting book with id
  const filteredBooksData = booksData?.filter((book) => {
    return book._id.includes(book_id);
  });

  return filteredBooksData.map((book) => {
    return (
      <div className="book-details" key={book._id}>
        {contextHolder}
        <div className="book-details-top">
          <div className="book-details-top-left">
            {<img src={book.image} alt="" />}
          </div>
          <div className="book-details-top-right">
            <div className="heading-rating">
              <h1 className="single-page-book-name main">{book.bookName}</h1>
              <div className="star-rating">
                <FaStar className="fastar" />
                <FaStar className="fastar" />
                <FaStar className="fastar" />
                <FaStar className="fastar" />
                <FaStar className="fastar-white" />
                <h3>4.0</h3>
              </div>
            </div>
            <div className="book-details-top-right-center">
              <div className="book-info">
                <div className="book-info-left">
                  <div className="review-section">
                    <BiSolidMessageDetail className="msg-icon" />
                    <p>{book.reviews} Reviews</p>
                  </div>
                  <div className="review-section">
                    <BiSolidLike
                      style={{
                        fill: "#6C5DD4",
                        height: "20px",
                        width: "20px",
                      }}
                    />
                    <p>{book.likes}k Like</p>
                  </div>
                </div>
                <div className="book-info-right">
                  <div className="facebook" style={{ background: "#1E33E6" }}>
                    <BiLogoFacebook style={{ height: "20px", width: "20px" }} />
                    <h5>Facebook</h5>
                  </div>
                  <div className="twitter" style={{ background: "#61C2E2" }}>
                    <BiLogoTwitter style={{ height: "20px", width: "20px" }} />
                    <h5>Twitter</h5>
                  </div>
                  <div className="whatsapp" style={{ background: "#53C259" }}>
                    <BiLogoWhatsapp style={{ height: "20px", width: "20px" }} />
                    <h5>Whatsapp</h5>
                  </div>
                  <div className="email" style={{ background: "#AAAAAA" }}>
                    <HiOutlineMail style={{ height: "20px", width: "20px" }} />
                    <h5>Email</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="book-details-top-right-bottom">
              <div className="book-description">
                <p style={{ margin: "25px 0px", color: "#4d4d4d" }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                  in adipisci earum? Nemo incidunt dicta atque a error
                  assumenda, soluta obcaecati vitae commodi, ut, culpa minima
                  non consequuntur fuga quisquam! Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Minus voluptatem aliquam enim
                  non sed! Dolores eius vitae et quas laborum sed amet commodi
                  blanditiis consequatur ipsum dolor, hic ipsam quod?
                </p>
                <p style={{ margin: "25px 0px", color: "#4d4d4d" }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                  in adipisci earum? Nemo incidunt dicta atque a error
                  assumenda, soluta obcaecati vitae commodi, ut, culpa minima
                  non consequuntur fuga quisquam! Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Minus voluptatem aliquam enim
                  non sed! Dolores eius vitae et quas laborum sed amet commodi
                  blanditiis consequatur ipsum dolor, hic ipsam quod?
                </p>
              </div>
              <div className="owner-info">
                <div className="owner-info-left">
                  <div className="written-by">
                    <h6>Written by</h6>
                    <h6>{book.author}</h6>
                  </div>
                  <div className="publisher">
                    <h6>Publisher</h6>
                    <h6>{book.publisher}</h6>
                  </div>
                  <div className="year">
                    <h6>Year</h6>
                    <h6>{book.publishedYear}</h6>
                  </div>
                </div>
                <div className="owner-info-right">
                  <div className="shipping-fee">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="#6C5DD2"
                      className="bi bi-lightning-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641l2.5-8.5z" />
                    </svg>
                    <h4>
                      {book.shippingCharges === 0
                        ? "FREE SHIPPING"
                        : book.shippingCharges}
                    </h4>
                  </div>
                  <div className="stock-availability">
                    <AiFillSafetyCertificate
                      style={{ height: "20px", width: "20px" }}
                    />
                    <h4>IN STOCKS</h4>
                  </div>
                </div>
              </div>
              <div className="pricing-section">
                <div className="pricing-section-left">
                  <h4>${book.discountedPrice}</h4>
                  <h6>${book.originalPrice}</h6>
                </div>
                <div className="pricing-section-right">
                  <button
                    className="addtocartbtn"
                    onClick={() => {
                      userData
                        ? handleAddToCart(book._id, userData._id)
                        : handleAddToCart();
                    }}
                    style={{ marginTop: "0px", width: "150px" }}
                  >
                    <MdOutlineShoppingCart size={18} />
                    Add to cart
                  </button>
                  <button
                    className={
                      userData
                        ? book.wishList.includes(userData._id)
                          ? "wishlist"
                          : "non-wishlist"
                        : "non-wishlist"
                    }
                    onClick={() => {
                      userData
                        ? handleWishlist(book, userData._id)
                        : handleWishlist();
                    }}
                  >
                    <FiHeart />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="book-details-bottom">
          <h1 className="product-details">Product Details</h1>
          <div className="product-details-bottom">
            <div className="book-title product">
              <h4>Book Title</h4>
              <h4 className="single-page-book-name">{book.bookName}</h4>
            </div>
            <div className="author product">
              <h4>Author</h4>
              <h4 className="single-page-author-name">{book.author}</h4>
            </div>

            <div className="book-format product">
              <h4>Book Format</h4>
              <h4>
                {book.bookFormat}, {book.totalPages} pages
              </h4>
            </div>
            <div className="book-format product">
              <h4>Publisher</h4>
              <h4>{book.publisher}.</h4>
            </div>
          </div>
        </div>
        <WhyToChoose />
        <NewsLetter />
        <Footer />
        <Copyright />
      </div>
    );
  });
};

export default Book;
