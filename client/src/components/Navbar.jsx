import React, { useEffect, useState } from "react";
import "../componentscss/Navbar.css";
import logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Modal, message } from "antd";
import { FiHeart } from "react-icons/fi";
import { GiWhiteBook } from "react-icons/gi";
import { MdOutlineShoppingCart } from "react-icons/md";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const [spinner, setSpinner] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //getting userData state from redux store
  const user = useSelector((state) => {
    return state.userData;
  });

  //getting booksData state from redux store
  const booksData = useSelector((state) => {
    return state.booksData;
  });

  //getting result state from redux store
  const result = useSelector((state) => {
    return state.result;
  });

  const showModal = (modal) => {
    modal(true);
  };
  const handleCancel = (modal) => {
    modal(false);
  };

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

  const style1 = {
    display: user ? "flex" : "none",
  };

  const style2 = {
    display: user ? "none" : "flex",
  };

  const logoutUser = () => {
    axios
      .get("/logout-user")
      .then((res) => {
        if (res.data.success) {
          dispatch({ type: "setUser", payload: null });
          success("User logout successfully");
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  const searchButtonHandler = () => {
    let searchResult = booksData.filter((book) => {
      return searchQuery.toLowerCase() === ""
        ? book
        : book.bookName.toLowerCase().includes(searchQuery.toLowerCase());
    });
    dispatch({ type: "setResult", payload: searchResult });
    navigate("/books");
    setSearchQuery("");
  };

  // this is array for showing links before user is logged in
  const items1 = [
    {
      label: <p onClick={() => showModal(setIsLoginModalOpen)}>Log In</p>,
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: <p onClick={() => showModal(setIsSignUpModalOpen)}>Sign Up</p>,
      key: "1",
    },
  ];

  // this is array for showing links after user is logged in
  const items2 = [
    {
      label: <Link to="/my-orders">My Orders</Link>,
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: <p onClick={logoutUser}>Logout</p>,
      key: "1",
    },
  ];

  const registerUser = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      handleCancel(setIsSignUpModalOpen);

      setTimeout(() => {
        warning("Password does not match");
      }, 0.001);
    } else {
      setSpinner(true);
      axios
        .post(
          "/register-user",
          {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            profilePicture,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setProfilePicture(undefined);
          if (res.data.success) {
            handleCancel(setIsSignUpModalOpen);
            success("User created successfully");
            setSpinner(false);
          } else if (res.data.userExist) {
            handleCancel(setIsSignUpModalOpen);
            error("This email is already been used");
            setSpinner(false);
          } else {
            handleCancel(setIsSignUpModalOpen);
            error("Internal Server Error");
            setSpinner(false);
          }
        })
        .catch((err) => {
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setProfilePicture(undefined);
          console.log(err);
          handleCancel(setIsSignUpModalOpen);
          error("Internal Server Error");
          setSpinner(false);
        });
    }
  };

  const loginUser = (e) => {
    e.preventDefault();
    setSpinner(true);
    axios
      .post(
        "/login-user",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setProfilePicture(undefined);
        if (res.data.success) {
          dispatch({ type: "setUser", payload: res.data.registeredUser });
          handleCancel(setIsLoginModalOpen);
          success(
            `${res.data.registeredUser.firstName} you have successfully logged in your account`
          );
          setSpinner(false);
        } else {
          handleCancel(setIsLoginModalOpen);
          error("invalid credentials");
          setSpinner(false);
        }
      })
      .catch((err) => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setProfilePicture(undefined);
        console.log(err);
      });
  };

  //to get count of wishlisted items by user
  const filteredWishlistData = booksData.filter((book) => {
    return book.wishList.includes(user ? user._id : "");
  }).length;

  //to get count of items added in cart by user
  const filteredCartData = booksData.filter((book) => {
    return book.cart.some((book) => book.user === user?._id);
  }).length;

  return (
    <div className="navbar" id="navbar">
      {contextHolder}
      <div className="container">
        <div className="navbar-left">
          <Link to="/">
            <div className="logo">
              <img src={logo} alt="logo" />
              <div className="logo-text">
                <h1 className="headline">Bookoe</h1>
                <p className="slogan">Read Imagine Explore</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="navbar-center">
          <div className="navbar-center-inner">
            <Link to="/books">
              <button className="menubtn">
                <GiWhiteBook
                  style={{ height: "35px", width: "35px", fill: "#6C5DD4" }}
                />
              </button>
            </Link>
            <input
              type="text"
              placeholder="Search over 30 million book titles"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="searchbtn" onClick={searchButtonHandler}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                fill="rgba(108, 93, 212, 1)"
                className="bi bi-search"
                viewBox="0 0 16 16"
                style={{
                  stroke: "rgba(108, 93, 212, 1)",
                  strokeWidth: "0.3px",
                }}
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="navbar-right">
          <Link to="/wishlist">
            <div className="wishlist-container" style={user ? style1 : {}}>
              {filteredWishlistData > 0 ? (
                <div className="wishlist-counter">{filteredWishlistData}</div>
              ) : (
                ""
              )}
              <FiHeart />
            </div>
          </Link>
          <Link to="/checkout">
            <div className="cart-container" style={user ? style1 : {}}>
              {filteredCartData > 0 ? (
                <div className="cart-counter">{filteredCartData}</div>
              ) : (
                ""
              )}
              <MdOutlineShoppingCart size={18} />
            </div>
          </Link>
          <button
            className="login"
            onClick={() => showModal(setIsLoginModalOpen)}
            style={user ? style2 : {}}
          >
            Log In
          </button>
          <button
            className="signup"
            onClick={() => showModal(setIsSignUpModalOpen)}
            style={user ? style2 : {}}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              fill="currentColor"
              className="bi bi-person"
              viewBox="0 0 16 16"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
            </svg>
            Sign Up
          </button>
          <Dropdown
            menu={user ? { items: items2 } : { items: items1 }}
            trigger={["click"]}
          >
            <div className="user-container" style={user ? style1 : {}}>
              <img
                src={
                  user
                    ? user.profilePicture
                    : "https://img.freepik.com/free-photo/young-man-wearing-blue-outfit-holding-gesture_1298-109.jpg?w=740&t=st=1693490056~exp=1693490656~hmac=e860ecb48f771392290f26e8c53335d00934bc7550cc0c958e07a47b29f099c0"
                }
                alt=""
              />
            </div>
          </Dropdown>
        </div>

        {/* signup modal */}
        <Modal
          open={isSignUpModalOpen}
          onCancel={() => handleCancel(setIsSignUpModalOpen)}
          className="sign-up-modal"
        >
          <form onSubmit={registerUser}>
            <h1 className="sign-up">SIGN UP</h1>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <br /> <br />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <br /> <br />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br /> <br />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br /> <br />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <br /> <br />
            <input
              type="file"
              onChange={(e) => setProfilePicture(e.target.files[0])}
              required
              accept=".jpeg,.jpg,.png"
            />
            <br /> <br />
            <button id="sign-up-btn">
              <div
                className="spinner"
                style={{ display: spinner ? "block" : "none" }}
              ></div>
              <span style={{ display: spinner ? "none" : "block" }}>
                SIGN UP
              </span>
            </button>
            <br />
            <p
              onClick={() => {
                handleCancel(setIsSignUpModalOpen);
                showModal(setIsLoginModalOpen);
              }}
            >
              Already have an account ?
            </p>
          </form>
        </Modal>

        {/* login modal */}
        <Modal
          open={isLoginModalOpen}
          onCancel={() => handleCancel(setIsLoginModalOpen)}
          className="log-in-modal"
        >
          <form onSubmit={loginUser}>
            <h1 className="log-in">LOGIN</h1>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />{" "}
            <br /> <br />
            <input
              type="password"
              placeholder="Enter Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br /> <br />
            <button id="log-in-btn">
              <div
                className="spinner"
                style={{ display: spinner ? "block" : "none" }}
              ></div>
              <span style={{ display: spinner ? "none" : "block" }}>LOGIN</span>
            </button>
            <br />
            <p
              onClick={() => {
                handleCancel(setIsLoginModalOpen);
                showModal(setIsSignUpModalOpen);
              }}
            >
              Create a new account ?
            </p>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Navbar;
