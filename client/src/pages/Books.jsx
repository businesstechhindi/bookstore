import React, { useEffect, useState } from "react";
import "../Pagescss/Books.css";
import {
  Collapse,
  Slider,
  Checkbox,
  Select,
  Space,
  message,
  Empty,
} from "antd";
import SlackSpinner from "../assets/slack_animation.gif";
import { FiMenu, FiHeart } from "react-icons/fi";
import { IoGridOutline } from "react-icons/io5";
import { PiSortAscending } from "react-icons/pi";
// import {IoMdCart} from "react-icons/io"
import { MdOutlineShoppingCart } from "react-icons/md";
import WhyToChoose from "../components/WhyToChoose";
import NewsLetter from "../components/NewsLetter";
import FOOTER from "../components/Footer";
import Copyright from "../components/Copyright";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Books = () => {
  const dispatch = useDispatch();
  const [defaultMinMaxValue, setDefaultMinMaxValue] = useState([5, 500]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedPublishers, setSelectedPublishers] = useState([]);
  // const [result, setResult] = useState(null);

  //getting booksData state from redux store
  const booksData = useSelector((state) => {
    return state.booksData;
  });

  //getting userData state from redux store
  const userData = useSelector((state) => {
    return state.userData;
  });

  //getting result state from redux store
  const result = useSelector((state) => {
    return state.result;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get("/user-auth")
      .then((res) => {
        if (res.data.success)
          dispatch({ type: "setUser", payload: res.data.userDetails });
      })
      .catch((err) => console.log(err));
  }, []);

  const [value, setValue] = useState([5, 500]);
  const [preventUser, setPreventUser] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

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

  function onChange(value) {
    setValue([value[0], value[1]]);
  }

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    if (value === "price high to low") {
      const sortedBooksData = booksData
        .slice()
        .sort((a, b) => b.discountedPrice - a.discountedPrice);
      dispatch({ type: "setResult", payload: sortedBooksData });
    } else if (value === "price low to high") {
      const sortedBooksData = booksData
        .slice()
        .sort((a, b) => a.discountedPrice - b.discountedPrice);
      dispatch({ type: "setResult", payload: sortedBooksData });
    } else if (value === "popularity") {
      const sortedBooksData = booksData
        .slice()
        .sort((a, b) => b.likes - a.likes);
      dispatch({ type: "setResult", payload: sortedBooksData });
    } else {
      const sortedBooksData = booksData.filter((book) => book);
      dispatch({ type: "setResult", payload: sortedBooksData });
    }
  };

  function onAfterChange(value) {
    console.log("onAfterChange: ", value);
  }

  const handleRefineSearch = () => {
    let filterWithYearsAndPrice;
    let filterWithPublishersAndYearsAndPrice;
    const filterWithPrice = booksData.filter(
      (book) =>
        book.discountedPrice >= value[0] && book.discountedPrice <= value[1]
    );

    if (selectedYears.length !== 0) {
      filterWithYearsAndPrice = filterWithPrice.filter((book) => {
        return selectedYears.includes(book.publishedYear);
      });
      if (selectedPublishers.length !== 0) {
        filterWithPublishersAndYearsAndPrice = filterWithYearsAndPrice.filter(
          (book) => {
            return selectedPublishers.includes(book.publisher);
          }
        );
        dispatch({
          type: "setResult",
          payload: filterWithPublishersAndYearsAndPrice,
        });
      } else {
        dispatch({ type: "setResult", payload: filterWithYearsAndPrice });
      }
    } else {
      // dispatch({ type: "setResult", payload: filterWithPrice });
      if (selectedPublishers.length !== 0) {
        filterWithPublishersAndYearsAndPrice = filterWithPrice.filter(
          (book) => {
            return selectedPublishers.includes(book.publisher);
          }
        );
        dispatch({
          type: "setResult",
          payload: filterWithPublishersAndYearsAndPrice,
        });
      } else {
        dispatch({ type: "setResult", payload: filterWithPrice });
      }
    }
  };

  const handleResetFilter = () => {
    setValue([5, 500]);
    setDefaultMinMaxValue([5, 500]);
    setSelectedYears([]);
    setSelectedPublishers([]);
  };

  const handleYearCheckbox = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      // If the checkbox is checked, add its value to the array
      setSelectedYears((prevSelectedYears) => [...prevSelectedYears, value]);
    } else {
      // If the checkbox is unchecked, remove its value from the array
      setSelectedYears((prevSelectedYears) =>
        prevSelectedYears.filter((year) => year !== value)
      );
    }
  };

  const handlePublisherCheckbox = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      // If the checkbox is checked, add its value to the array
      setSelectedPublishers((prevSelectedPublishers) => [
        ...prevSelectedPublishers,
        value,
      ]);
    } else {
      // If the checkbox is unchecked, remove its value from the array
      setSelectedPublishers((prevSelectedPublishers) =>
        prevSelectedPublishers.filter((publisher) => publisher !== value)
      );
    }
  };

  const handleWishlist = (item, user) => {
    console.log(item, user);
    console.log(user);
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

  return result ? (
    <div className="books">
      {contextHolder}
      <div className="books-inner">
        <div className="books-left">
          <h1>Filter Option</h1>
          <Collapse accordion>
            <Collapse.Panel header="Price Range">
              <Slider
                range
                step={5}
                min={5}
                max={500}
                defaultValue={defaultMinMaxValue}
                value={[value[0], value[1]]}
                onChange={onChange}
                onAfterChange={onAfterChange}
              />
              <div className="ranges">
                <div className="range-from">
                  <div className="range-from-input">
                    <h3>{value[0]}</h3>
                  </div>
                </div>
                <h1>-</h1>
                <div className="range-to">
                  <div className="range-to-input">
                    <h3>{value[1]}</h3>
                  </div>
                </div>
              </div>
            </Collapse.Panel>
          </Collapse>
          <Collapse accordion>
            <Collapse.Panel header="Select Year">
              <div className="years">
                <div className="check-boxes">
                  <Checkbox
                    value={2000}
                    onChange={handleYearCheckbox}
                    checked={selectedYears.includes(2000)}
                    // checked={true}
                  >
                    2000
                  </Checkbox>
                  <Checkbox
                    value={2001}
                    onChange={handleYearCheckbox}
                    checked={selectedYears.includes(2001)}
                  >
                    2001
                  </Checkbox>
                  <Checkbox
                    value={2002}
                    onChange={handleYearCheckbox}
                    checked={selectedYears.includes(2002)}
                  >
                    2002
                  </Checkbox>
                  <Checkbox
                    value={2003}
                    onChange={handleYearCheckbox}
                    checked={selectedYears.includes(2003)}
                  >
                    2003
                  </Checkbox>
                  <Checkbox
                    value={2004}
                    onChange={handleYearCheckbox}
                    checked={selectedYears.includes(2004)}
                  >
                    2004
                  </Checkbox>
                  <Checkbox
                    value={2005}
                    onChange={handleYearCheckbox}
                    checked={selectedYears.includes(2005)}
                  >
                    2005
                  </Checkbox>
                  <Checkbox
                    value={2006}
                    onChange={handleYearCheckbox}
                    checked={selectedYears.includes(2006)}
                  >
                    2006
                  </Checkbox>
                  <Checkbox
                    value={2007}
                    onChange={handleYearCheckbox}
                    checked={selectedYears.includes(2007)}
                  >
                    2007
                  </Checkbox>
                  <Checkbox
                    value={2008}
                    onChange={handleYearCheckbox}
                    checked={selectedYears.includes(2008)}
                  >
                    2008
                  </Checkbox>
                  <Checkbox
                    value={2009}
                    onChange={handleYearCheckbox}
                    checked={selectedYears.includes(2009)}
                  >
                    2009
                  </Checkbox>
                  <Checkbox
                    value={2010}
                    onChange={handleYearCheckbox}
                    checked={selectedYears.includes(2010)}
                  >
                    2010
                  </Checkbox>
                  <Checkbox
                    value={2011}
                    onChange={handleYearCheckbox}
                    checked={selectedYears.includes(2011)}
                  >
                    2011
                  </Checkbox>
                  <Checkbox
                    value={2012}
                    onChange={handleYearCheckbox}
                    checked={selectedYears.includes(2012)}
                  >
                    2012
                  </Checkbox>
                  <Checkbox
                    value={2013}
                    onChange={handleYearCheckbox}
                    checked={selectedYears.includes(2013)}
                  >
                    2013
                  </Checkbox>
                  <Checkbox
                    value={2014}
                    onChange={handleYearCheckbox}
                    checked={selectedYears.includes(2014)}
                  >
                    2014
                  </Checkbox>
                  <Checkbox
                    value={2015}
                    onChange={handleYearCheckbox}
                    checked={selectedYears.includes(2015)}
                  >
                    2015
                  </Checkbox>
                  <Checkbox
                    value={2016}
                    onChange={handleYearCheckbox}
                    checked={selectedYears.includes(2016)}
                  >
                    2016
                  </Checkbox>
                  <Checkbox
                    value={2017}
                    onChange={handleYearCheckbox}
                    checked={selectedYears.includes(2017)}
                  >
                    2017
                  </Checkbox>
                  <Checkbox
                    value={2018}
                    onChange={handleYearCheckbox}
                    checked={selectedYears.includes(2018)}
                  >
                    2018
                  </Checkbox>
                  <Checkbox
                    value={2019}
                    onChange={handleYearCheckbox}
                    checked={selectedYears.includes(2019)}
                  >
                    2019
                  </Checkbox>
                  <Checkbox
                    value={2020}
                    onChange={handleYearCheckbox}
                    checked={selectedYears.includes(2020)}
                  >
                    2020
                  </Checkbox>
                  <Checkbox
                    value={2021}
                    onChange={handleYearCheckbox}
                    checked={selectedYears.includes(2021)}
                  >
                    2021
                  </Checkbox>
                  <Checkbox
                    value={2022}
                    onChange={handleYearCheckbox}
                    checked={selectedYears.includes(2022)}
                  >
                    2022
                  </Checkbox>
                  <Checkbox
                    value={2023}
                    onChange={handleYearCheckbox}
                    checked={selectedYears.includes(2023)}
                  >
                    2023
                  </Checkbox>
                </div>
              </div>
            </Collapse.Panel>
          </Collapse>
          <Collapse accordion>
            <Collapse.Panel header="Select Publisher">
              <div className="years">
                <div className="check-boxes">
                  <Checkbox
                    value={"wepress inc"}
                    onChange={handlePublisherCheckbox}
                    checked={selectedPublishers.includes("wepress inc")}
                  >
                    Wepress inc
                  </Checkbox>
                  <Checkbox
                    value={"harper collins"}
                    onChange={handlePublisherCheckbox}
                    checked={selectedPublishers.includes("harper collins")}
                  >
                    Harper collins
                  </Checkbox>
                  <Checkbox
                    value={"simon & schuster"}
                    onChange={handlePublisherCheckbox}
                    checked={selectedPublishers.includes("simon & schuster")}
                  >
                    Simon & schuster
                  </Checkbox>
                  <Checkbox
                    value={"random house"}
                    onChange={handlePublisherCheckbox}
                    checked={selectedPublishers.includes("random house")}
                  >
                    Random house
                  </Checkbox>
                  <Checkbox
                    value={"wiley"}
                    onChange={handlePublisherCheckbox}
                    checked={selectedPublishers.includes("wiley")}
                  >
                    Wiley
                  </Checkbox>
                  <Checkbox
                    value={"dundurn press"}
                    onChange={handlePublisherCheckbox}
                    checked={selectedPublishers.includes("dundurn press")}
                  >
                    Dundurn press
                  </Checkbox>
                  <Checkbox
                    value={"annick press"}
                    onChange={handlePublisherCheckbox}
                    checked={selectedPublishers.includes("annick press")}
                  >
                    Annick press
                  </Checkbox>
                  <Checkbox
                    value={"red deer press"}
                    onChange={handlePublisherCheckbox}
                    checked={selectedPublishers.includes("red deer press")}
                  >
                    Red deer press
                  </Checkbox>
                </div>
              </div>
            </Collapse.Panel>
          </Collapse>
          <div className="refine-search">
            <button onClick={handleRefineSearch}>Refine Search</button>
          </div>
          <div className="reset-filter">
            <button onClick={handleResetFilter}>Reset Filter</button>
          </div>
        </div>
        <div className="books-right">
          <h1>Books</h1>
          <div className="books-header">
            <div className="books-header-left">
              <div className="uploaded-time">
                <h3>Today</h3>
                <h4>This Week</h4>
                <h4>This Month</h4>
              </div>
              <div className="grid-list-view">
                <div className="list-view">
                  <FiMenu className="menu" />
                </div>
                <div className="grid-view">
                  <IoGridOutline className="grid" />
                </div>
              </div>
            </div>
            <div className="books-header-right">
              <div className="sort-icon">
                <PiSortAscending className="sorticon" />
              </div>
              <Space wrap>
                <Select
                  defaultValue="newest first"
                  onChange={handleChange}
                  options={[
                    {
                      value: "newest first",
                      label: "Newest First",
                    },
                    {
                      value: "price low to high",
                      label: "Price -- Low to High",
                    },
                    {
                      value: "price high to low",
                      label: "Price -- High to Low",
                    },
                    {
                      value: "popularity",
                      label: "Popularity",
                    },
                  ]}
                />
              </Space>
            </div>
          </div>
          {result.length === 0 ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          ) : (
            <div className="available-books">
              {result.map((book) => {
                return (
                  <Link key={book._id} to={`/${book._id}`}>
                    <div className="book-card" key={book._id}>
                      <div className="book-inner-card">
                        <img src={book.image} alt="" loading="lazy" />
                        <button
                          type="button"
                          className={
                            userData
                              ? book.wishList.includes(userData._id)
                                ? "wishlist"
                                : "non-wishlist"
                              : "non-wishlist"
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            userData
                              ? handleWishlist(book, userData._id)
                              : handleWishlist();
                          }}
                        >
                          <FiHeart />
                        </button>
                      </div>
                      <h4 className="bookname">{book.bookName}</h4>
                      <h3 className="book-price">
                        $ {book.discountedPrice}{" "}
                        <span className="orig-price">
                          ${book.originalPrice}
                        </span>
                      </h3>
                      <button
                        className="addtocartbtn"
                        onClick={(e) => {
                          e.preventDefault();
                          userData
                            ? handleAddToCart(book._id, userData._id)
                            : handleAddToCart();
                        }}
                      >
                        <MdOutlineShoppingCart size={18} />
                        Add to cart
                      </button>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <WhyToChoose />
      <NewsLetter />
      <FOOTER />
      <Copyright />
    </div>
  ) : (
    <div className="slack-spinner">
      <img src={SlackSpinner} style={{ width: "150px" }} />
    </div>
  );
};

export default Books;
