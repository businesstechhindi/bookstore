import React from "react";
import "../componentscss/WhyToChoose.css";
import deliveryIcon from "../assets/delivery-icon.svg";
import securePaymentIcon from "../assets/secure-payment.svg"
import qualityIcon from "../assets/quality-icon.svg"
import starIcon from "../assets/staricon.svg"


const WhyToChoose = () => {
  return (
    <div className="whytochooseus">
      <div className="quick-delivery-box">
        <div className="quick-delivery-icon">
          <img src={deliveryIcon} alt="" className="delivery-icon"/>
        </div>
        <div className="quick-delivery-text">
          <h3>Quick Delivery</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit
            voluptatibus quisquam
          </p>
        </div>
      </div>
      <div className="secure-payment-box">
        <div className="quick-delivery-icon">
          <img src={securePaymentIcon} alt="" className="delivery-icon"/>
        </div>
        <div className="quick-delivery-text">
          <h3>Secure Payment</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit
            voluptatibus quisquam
          </p>
        </div>
      </div>
      <div className="best-quality-box">
        <div className="quick-delivery-icon">
          <img src={qualityIcon} alt="" className="delivery-icon"/>
        </div>
        <div className="quick-delivery-text">
          <h3>Best Quality</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit
            voluptatibus quisquam
          </p>
        </div>
      </div>
      <div className="return-guarantee-box">
        <div className="quick-delivery-icon">
          <img src={starIcon} alt="" className="delivery-icon"/>
        </div>
        <div className="quick-delivery-text">
          <h3>Return Guarantee</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit
            voluptatibus quisquam
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyToChoose;
