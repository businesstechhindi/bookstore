import React, { useEffect, useState } from "react";
import "../Pagescss/Myorders.css";
import Footer from "../components/Footer";
import Copyright from "../components/Copyright";
import tickIcon from "../assets/tick.svg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Myorders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [myOrders, setMyOrders] = useState(null);

  //getting userData state from redux store
  const user = useSelector((state) => {
    return state.userData;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get("/user-auth")
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          dispatch({ type: "setUser", payload: res.data.userDetails });
        } else {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));

    axios
      .get("/get-all-orders")
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          setMyOrders(res.data.orders);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const filteredMyOrders = myOrders?.filter((filteredOrder) => {
    return filteredOrder.userId === user?._id;
  });
  return (
    <>
      {myOrders ? (
        filteredMyOrders.length > 0 ? (
          <div className="myorders">
            <table className="orders">
              <tr>
                <th>Serial No.</th>
                <th>Order ID</th>
                <th>Book Image</th>
                <th>Price</th>
                <th>Book Name</th>
                <th>Quantity</th>
                <th>Status</th>
              </tr>
              {filteredMyOrders.map((order, index) => {
                return (
                  <tr key={order._id}>
                    <td>{index + 1}</td>
                    <td>{order._id}</td>
                    <td className="ordered-image-container">
                      <img
                        className="ordered-image"
                        src={order.bookImage}
                        alt=""
                      />
                    </td>
                    <td>$ {order.bookPrice}</td>
                    <td style={{ textTransform: "capitalize" }}>
                      {order.bookName}
                    </td>
                    <td>{order.quantity}</td>
                    <td>
                      <img src={tickIcon} alt="" className="tickicon" />
                      {order.status}
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        ) : (
          <div className="empty-wishlist">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/confusing-woman-due-to-empty-cart-4558760-3780056.png"
              alt=""
              loading="lazy"
            />
            <h1>Your cart is Empty!</h1>
            <h2>Add something to make me Happy!!</h2>
          </div>
        )
      ) : (
        ""
      )}

      <Footer />
      <Copyright />
    </>
  );
};

export default Myorders;
