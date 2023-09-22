import React, { useEffect, useState } from "react";
import validator from "email-validator";
import "../componentscss/NewsLetter.css";
import { message } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";

const NewsLetter = () => {
  //getting userData state from redux store
  const user = useSelector((state) => {
    return state.userData;
  });

  const [messageApi, contextHolder] = message.useMessage();
  const [email, setEmail] = useState("");

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
    if (user) {
      setEmail(user.email);
    } else {
      setEmail("");
    }
  }, [user]);
  const handleSubscribeNewsletter = () => {
    const isEmailValid = validator.validate(email);
    if (user) {
      if (isEmailValid) {
        axios
          .post(
            "/subscribe-newsletter",
            {
              firstName: user.firstName,
              lastName: user.lastName,
              email,
              userId: user._id,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            if (res.data.success) {
              success("Thanks for subscribing our newsletter!");
            } else {
              error("Please try again later!");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        error("Please enter valid email");
      }
    } else {
      error("Please first login your account");
    }
  };

  return (
    <div className="news-letter">
      {contextHolder}
      <div className="news-letter-inner">
        <div className="news-letter-box">
          <h1>Subscribe our newsletter for newest books updates</h1>
          <div className="inputes">
            <input
              type="text"
              name=""
              id=""
              value={email}
              placeholder="Type your email here"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSubscribeNewsletter}>SUBSCRIBE</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
