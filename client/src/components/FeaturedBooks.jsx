import React, { useState } from "react";
import "../componentscss/FeaturedBooks.css";
import { message } from "antd";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const FeaturedBooks = () => {
  const [preventUser, setPreventUser] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();

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

  //getting booksData state from redux store
  const booksData = useSelector((state) => {
    return state.booksData;
  });

  //getting userData state from redux store
  const userData = useSelector((state) => {
    return state.userData;
  });


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
  return (
    <div className="featured-books">
      {contextHolder}
      <div className="featured-books-inner">
        <div className="featured-books-left">
          <h1>Featured Books</h1>
          <p className="featured-description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. <br />
            Deserunt facilis excepturi, quos inventore ipsum voluptate ab
            dolorum.
          </p>
          <div className="featured-book-card-left">
            <div className="book-box">
              <Link to={`/${booksData[0]._id}`}>
                <img src={booksData[0].image} alt="" id="featured-img" loading="lazy"/>
              </Link>
            </div>
            <div className="featured-book-info-box">
              <div className="featured-book-info-box-top">
                <div className="book-mark-icon">
                  <div className="star-icon">
                    <FaStar
                      style={{ height: "18px", width: "22px", fill: "white" }}
                    />
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    fill="#6C5DD2"
                    className="bi bi-bookmark"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                  </svg>
                </div>
                <div className="book-name">
                  <h2>Big Magic</h2>
                </div>
              </div>
              <p className="featured-book-description">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem
                amet, deleniti sequi id quas veniam repellat itaque dignissimos
                quia. Consequuntur, possimus voluptatibus! Temporibus ducimus
                quibusdam eius possimus quisquam, laborum maiores Lorem ipsum,
                dolor sit amet consectetur adipisicing elit. Qui, ut assumenda
                quas dolores eum quam quisquam explicabo aliquid velit vel quis,
                ullam, dolore tempore error. Blanditiis qui voluptates harum
                facilis! lore
              </p>
              <div className="writer-info">
                <div className="written-by">
                  <p>Writen by</p>
                  <h5>{booksData[0].author}</h5>
                </div>
                <div className="year">
                  <p>Year</p>
                  <h5>{booksData[0].publishedYear}</h5>
                </div>
              </div>
              <div className="featured-book-info-box-bottom">
                <div className="featured-book-price">
                  <h5>
                    $ {booksData[0].originalPrice}{" "}
                    <span className="without-discount">
                      ${booksData[0].discountedPrice}
                    </span>
                  </h5>
                  <button
                    className="addtocart"
                    onClick={(e) => {
                      e.preventDefault();
                      userData
                        ? handleAddToCart(booksData[0]._id, userData._id)
                        : handleAddToCart();
                    }}
                  >
                    <div className="cart-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-bag-check"
                        viewBox="0 0 16 16"
                        style={{ strokeWidth: "0.5px", stroke: "white" }}
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                        />
                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                      </svg>
                    </div>
                    <h4>ADD</h4>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="featured-books-right">
          <div className="featured-books-box-right">
            <div className="book-image">
              <Link to={`/${booksData[1]._id}`}>
                <img src={booksData[1].image} alt="" loading="lazy"/>
              </Link>
            </div>

            <div className="book-image">
              <Link to={`/${booksData[2]._id}`}>
                <img src={booksData[2].image} alt="" loading="lazy"/>
              </Link>
            </div>
            <div className="book-image">
              <Link to={`/${booksData[3]._id}`}>
                <img src={booksData[3].image} alt="" loading="lazy"/>
              </Link>
            </div>

            <div className="book-image">
              <Link to={`/${booksData[4]._id}`}>
                <img src={booksData[4].image} alt="" loading="lazy"/>
              </Link>
            </div>
            <div className="book-image">
              <Link to={`/${booksData[5]._id}`}>
                <img src={booksData[5].image} alt="" loading="lazy"/>
              </Link>
            </div>
            <div className="book-image">
              <Link to={`/${booksData[6]._id}`}>
                <img src={booksData[6].image} alt="" loading="lazy"/>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBooks;
