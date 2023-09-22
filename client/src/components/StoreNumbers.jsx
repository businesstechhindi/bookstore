import React from "react";
import "../componentscss/StoreNumbers.css";
import customersIcon from "../assets/customers.svg"
import booksIcon from "../assets/books.svg"
import storeIcon from "../assets/store.svg"
import writersIcon from "../assets/writers.svg"

const StoreNumbers = () => {
  return (
    <div className="store-numbers">
      <div className="happy-customers">
        <div className="happy-customers-icon">
          <img src={customersIcon} alt="" />
        </div>
        <div className="happy-customers-count">
          <h1>125,663</h1>
        </div>
        <div className="happy-customers-text">
          <p>Happy Customers</p>
        </div>
      </div>
      <div className="book-collections">
        <div className="book-collections-icon">
          <img src={booksIcon} alt="" />
        </div>
        <div className="book-collections-count">
          <h1>50,672+</h1>
        </div>
        <div className="book-collections-text">
          <p>Book Collections</p>
        </div>
      </div>
      <div className="our-stores">
        <div className="our-stores-icon">
          <img src={storeIcon} alt="" />
        </div>
        <div className="our-stores-count">
          <h1>1,562</h1>
        </div>
        <div className="our-stores-text">
          <p>Our Stores</p>
        </div>
      </div>
      <div className="famous-writers">
        <div className="famous-writers-icon">
          <img src={writersIcon} alt="" />
        </div>
        <div className="famous-writers-count">
          <h1>457</h1>
        </div>
        <div className="famous-writers-text">
          <p>Famous Writers</p>
        </div>
      </div>
    </div>
  );
};

export default StoreNumbers;
