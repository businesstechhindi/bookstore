import React from "react";
import "../componentscss/Footer.css";
import logo from "../assets/logo.svg";
import address from "../assets/address.svg";
import contactNumber from "../assets/contact-number.svg";
import supportEmail from "../assets/support-email.svg";
import {
  BsTwitter,
  BsLinkedin,
  BsInstagram,
  BsFacebook,
  BsYoutube,
} from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <div className="logo">
          <img src={logo} alt="logo" />
          <div className="logo-text">
            <h1 className="headline">Bookoe</h1>
            <p className="slogan">Read Imagine Explore</p>
          </div>
        </div>
        <div className="store-info">
          <h6>
            Bookoe is a Book Store Website lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </h6>
        </div>
        <h3 className="social-follow">Follow Us</h3>
        <div className="social-icons">
          <div className="facebook-icon">
            <BsFacebook
              style={{ height: "auto", width: "100%", color: "#1E33E5" }}
            />
          </div>
          <div className="youtube-icon">
            <BsYoutube style={{ height: "auto", width: "100%", color: "#FF2B2B" }}/>
          </div>
          <div className="twitter-icon">
            <BsTwitter
              style={{ height: "auto", width: "100%", color: "#3CB5DB" }}
            />
          </div>
          <div className="linkedin-icon">
            <BsLinkedin
              style={{ height: "auto", width: "100%", color: "#286FA3" }}
            />
          </div>
          <div className="instagram-icon">
            <BsInstagram
              style={{ height: "auto", width: "100%", color: "#FD3E77" }}
            />
          </div>
        </div>
      </div>
      <div className="footer-center">
        <div className="footer-center-left">
          <h4>Books Categories</h4>
          <div className="books-categories">
            <div className="books-categories-left">
              <h5>Action</h5>
              <h5>Adventure</h5>
              <h5>Comedy</h5>
              <h5>Crime</h5>
              <h5>Drama</h5>
              <h5>Fantasy</h5>
              <h5>Horror</h5>
            </div>
            <div className="books-categories-right">
              <h5>Action</h5>
              <h5>Adventure</h5>
              <h5>Comedy</h5>
              <h5>Crime</h5>
              <h5>Drama</h5>
              <h5>Fantasy</h5>
              <h5>Horror</h5>
            </div>
          </div>
        </div>
        <div className="footer-center-right">
          <h4 className="quick-links">Quick Links</h4>
          <h5>About us</h5>
          <h5>Contact us</h5>
          <h5>Products</h5>
          <h5>Login</h5>
          <h5>Sign Up</h5>
          <h5>FAQ</h5>
          <h5>Shipment</h5>
        </div>
      </div>
      <div className="footer-right">
        <h4 className="our-store">Our Store</h4>
        <div className="google-map-address">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9762.957127374351!2d-122.4168566141042!3d37.77970537437468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858085de1e33eb%3A0x1a31405067f79d69!2sSan%20Francisco%20Centre!5e1!3m2!1sen!2sin!4v1692129659183!5m2!1sen!2sin"
            height="100"
            style={{
              border: "0",
              borderRadius: "15px",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
            }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="footer-address">
          <img src={address} alt="" />
          <h5>832 Thompson Drive, San Fransisco CA 94107, United States</h5>
        </div>
        <div className="contact-number">
          <img src={contactNumber} alt="" />
          <h5>+123 345123 556</h5>
        </div>
        <div className="support-email">
          <img src={supportEmail} alt="" />
          <h5>support@bookoe.id</h5>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
