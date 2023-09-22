import "bootstrap-icons/font/bootstrap-icons.css";
import { Dropdown, Modal, message } from "antd";
import "../Pagescss/Home.css";
import Featured from "../components/Featured";
import WhyToChoose from "../components/WhyToChoose";
import FeaturedBooks from "../components/FeaturedBooks";
import StoreNumbers from "../components/StoreNumbers";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import Copyright from "../components/Copyright";
import { useEffect, useState } from "react";
import "../componentscss/mediaqueries.css";
import { useDispatch} from "react-redux";
import axios from "axios";
const Home = () => {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

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
    const navbar = document.getElementById("navbar");
    navbar.style.display = "flex";
    axios
      .get("/user-auth")
      .then((res) => {
        if (res.data.success)
          dispatch({ type: "setUser", payload: res.data.userDetails });
      })
      .catch((err) => console.log(err));

    // ------------------------------------------

    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      // Cleanup: Remove the event listener when the component unmounts
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth < 900) {
      setInnerWidth(window.innerWidth);
      const mobileSearchbar = document.getElementById("mobile-searchbar");
      mobileSearchbar.style.display = "flex";
    } else {
      const mobileSearchbar = document.getElementById("mobile-searchbar");
      mobileSearchbar.style.display = "none";
    }
  }, [innerWidth]);

  return (
    <>
      {contextHolder}
      <Featured />
      <WhyToChoose />
      <FeaturedBooks />
      <StoreNumbers />
      <NewsLetter />
      <Footer />
      <Copyright />
    </>
  );
};

export default Home;
