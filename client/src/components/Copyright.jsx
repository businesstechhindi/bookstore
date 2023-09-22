import React from "react";
import "../componentscss/Copyright.css";

const Copyright = () => {
  return (
    <div className="copyright">
      <div className="copyright-container">
        <div className="copyright-left">
          <h5>
            Bookoe Book Store Website - © {new Date().getFullYear()} All Rights
            Reserved
          </h5>
        </div>
        <div className="copyright-left">
          <h5>
            Made <span className="heart">♥</span> by Swapnil Shahare
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Copyright;
