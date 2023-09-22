import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SlackSpinner from "../src/assets/slack_animation.gif";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Books from "./pages/Books";
import Book from "./pages/Book";
import Cart from "./pages/Cart";
import MobileSearchbar from "./components/MobileSearchbar";
import Wishlist from "./pages/Wishlist";
import Myorders from "./pages/Myorders";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const booksData = useSelector((state) => {
    console.log(state);
    return state.booksData;
  });

  useEffect(() => {
    axios
      .get("/all-books")
      .then((res) => {
        console.log(res.data);
        dispatch({ type: "setBooksData", payload: res.data.allBooks });
        dispatch({ type: "setResult", payload: res.data.allBooks });
      })
      .catch((err) => console.log(err));
    AOS.init();
  }, []);

  return booksData ? (
    <Router>
      <Navbar />
      <MobileSearchbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/books" element={<Books />}></Route>
        <Route path="/:book_id" element={<Book />}></Route>
        <Route path="/wishlist" element={<Wishlist />}></Route>
        <Route path="/checkout" element={<Cart />}></Route>
        <Route path="/my-orders" element={<Myorders />}></Route>
        <Route path="/error" element={<ErrorPage />}></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </Router>
  ) : (
    <div className="slack-spinner">
      <img src={SlackSpinner} style={{ width: "150px" }} />
    </div>
  );
}

export default App;
