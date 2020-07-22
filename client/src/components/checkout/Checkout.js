import React, { Fragment } from "react";
//import { Link } from "react-router-dom";

import checkoutStyles from "./Checkout.module.css";

import Address from "../profile/Address";
import CreditCard from "./CreditCard";

//can become a form or simply a display. reuse this in checkout
const Checkout = () => {
  return (
    <Fragment>
      <div className={checkoutStyles.checkout}>
        <div className={checkoutStyles.deliveryOptions}>
          <div className={checkoutStyles.deliveryAddress}>
            <h2>Select Delivery Address</h2>
            <Address />
            <Address />
          </div>
          <div className={checkoutStyles.paymentOptions}>
            <h2>Select Payment Method</h2>
            <div className={checkoutStyles.paymentOption}>
              Credit Card / Debit Card
              <CreditCard />
            </div>
            <div className={checkoutStyles.paymentOption}>Cash On Delivery</div>
          </div>
        </div>
        <div className={checkoutStyles.orderSummary}>
          <h2>Order Summary</h2>
          <h3>Basket Value: ₹3000</h3>
          <h3>Delivery Charge: ₹50</h3>
          <h3>Total Amount: ₹3050</h3>
        </div>
      </div>
    </Fragment>
  );
};

export default Checkout;
