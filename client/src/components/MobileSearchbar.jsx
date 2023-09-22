import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../componentscss/MobileSearchbar.css";
import { GiWhiteBook } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";

const MobileSearchbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  //getting booksData state from redux store
  const booksData = useSelector((state) => {
    return state.booksData;
  });

  const searchHandler = () => {
    let searchResult = booksData.filter((book) => {
      return searchQuery.toLowerCase() === ""
        ? book
        : book.bookName.toLowerCase().includes(searchQuery.toLowerCase());
    });
    dispatch({ type: "setResult", payload: searchResult });
    navigate("/books");
    setSearchQuery("");
  };

  return (
    <div className="mobile-searchbar" id="mobile-searchbar">
      <div className="navbar-center-inner">
        <button className="menubtn">
          <Link to="/books">
            <GiWhiteBook
              style={{ height: "35px", width: "35px", fill: "#6C5DD4" }}
            />
          </Link>
        </button>
        <input
          type="text"
          placeholder="Search over 30 million book titles"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="searchbtn" onClick={searchHandler}>
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
  );
};

export default MobileSearchbar;
