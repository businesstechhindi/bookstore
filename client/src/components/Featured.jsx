import React, { useState } from "react";
import "../componentscss/Featured.css";
import { message } from "antd";
import girlwithbooks from "../assets/girlwithbooks.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

const Featured = () => {
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
    <div className="featured">
      {contextHolder}
      <div className="featured-left">
        <div className="featured-box-left">
          <h1 className="backtoschool">BACK TO SCHOOL</h1>
          <h1 className="specialoffertext">Special 50% Off</h1>
          <h1 className="outstudenttext">For our student community</h1>
          <p className="lorem-text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque
            necessitatibus cupiditate harum. A possimus illo adipisci corporis
            reprehenderit exercitationem! Voluptates quisquam corporis
            reprehenderit quam sint hic cupiditate facilis tempore ut.
          </p>
          <div className="offer-buttons">
            <button className="getthedeal">
              <h4>Get the deal</h4>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-right"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                />
              </svg>
            </button>
            <button className="otherpromo">
              <h4>See other promos</h4>
            </button>
          </div>
        </div>
        <div className="featured-box-right">
          <img src={girlwithbooks} alt="books" className="girlwithbooks" />
        </div>
      </div>
      <div className="featured-right">
        {
          <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            {booksData.map((item) => {
              return item.featured ? (
                <div key={item._id}>
                  <SwiperSlide key={item._id}>
                    <div
                      className="background-image"
                      style={{ backgroundImage: `url(${item.image})` }}
                    ></div>
                    <h1 className="best-seller">Best Seller</h1>
                    <h5 className="week-sales">Based on this week sales</h5>
                    <img className="test-img" src={item.image} alt="" />
                    <h5 className="swiper-book-name">{item.bookName}</h5>
                    <button
                      className="click"
                      onClick={(e) => {
                        e.preventDefault();
                        userData
                          ? handleAddToCart(item._id, userData._id)
                          : handleAddToCart();
                      }}
                    >
                      <span className="swiper-original-price">
                        {item.originalPrice}
                      </span>{" "}
                      USD {item.discountedPrice}
                    </button>
                  </SwiperSlide>
                </div>
              ) : (
                ""
              );
            })}
          </Swiper>
        }
      </div>
    </div>
  );
};

export default Featured;
