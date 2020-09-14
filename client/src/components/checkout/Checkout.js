import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { emptyCart } from "../../actions/cart";
import PropTypes from "prop-types";

import cx from "classnames";
import checkoutStyles from "./Checkout.module.css";
import globalStyles from "../../Global.module.css";

import Addresses from "../profile/Addresses";
import Spinner from "../graphics/Spinner";
//import StripeCheckout from "react-stripe-checkout";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

import axios from "axios";

const promise = loadStripe(process.env.REACT_APP_STRIPEKEY);
const COD = "Cash On Delivery";
const CARD = "Credit Card / Debit Card";

//can become a form or simply a display. reuse this in checkout
const Checkout = ({ items, emptyCart, token }) => {
  let total = 0;
  items.forEach(({ price, quantity }) => {
    total = total + price * quantity;
  });

  const [checkoutState, setCheckoutState] = useState({
    orderPlaced: false,
    addressSelected: false,
    selectedAddressId: null,
    paymentModeSelected: false,
    paymentMode: null,
    loading: false,
  });

  let {
    addressSelected,
    paymentModeSelected,
    paymentMode,
    orderPlaced,
    selectedAddressId,
    loading,
  } = checkoutState;

  const onSelectAddress = (addressId) => {
    setCheckoutState((prevState) => ({
      ...prevState,
      addressSelected: true,
      selectedAddressId: addressId,
    }));
  };

  const unSelectAddress = () => {
    setCheckoutState((prevState) => ({
      ...prevState,
      addressSelected: false,
      selectedAddressId: null,
    }));
  };

  const onSelectPaymentMode = (paymentMode) => {
    setCheckoutState((prevState) => ({
      ...prevState,
      paymentModeSelected: true,
      paymentMode,
    }));
  };

  const unSelectPaymentMode = () => {
    setCheckoutState((prevState) => ({
      ...prevState,
      paymentModeSelected: false,
      paymentMode: null,
    }));
  };

  const placeOrder = async (/* stripeToken */) => {
    //console.log("place order");
    /* console.log(process.env.REACT_APP_STRIPEKEY); */
    if (!selectedAddressId) return;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };

    try {
      let itemsToSend = items.map(({ id, quantity }) => ({
        productID: id,
        quantity,
      }));
      let deliveryAddress = selectedAddressId;
      let paymentMethod = paymentMode;

      setCheckoutState((prevState) => ({ ...prevState, loading: true }));

      const res = await axios.post(
        "/api/order",
        { items: itemsToSend, deliveryAddress, paymentMethod },
        config
      );

      console.log(res.data);

      //let orderID = res.data;

      /* if (paymentMode === CARD) {
        const config = {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        };

        const res = await axios.put(
          `/api/order/payment/${orderID}`,
          { stripeToken },
          config
        );

        console.log(res);
      } */

      setCheckoutState((prevState) => ({
        ...prevState,
        orderPlaced: true,
        loading: false,
      }));

      emptyCart();
    } catch (err) {
      console.log("failed to post Order");
      setCheckoutState((prevState) => ({ ...prevState, loading: false }));
      console.log(err);
    }
  };

  if (loading)
    return (
      <Fragment>
        <div className={cx(globalStyles.flexCenter)}>
          <Spinner />
        </div>
      </Fragment>
    );

  if (orderPlaced) {
    /* setCheckoutState((prevState) => ({
      ...prevState,
      paymentModeSelected: false,
      paymentMode: null,
    })); */
    return <Redirect to="/orders" />;
  }

  if (!token) return <Redirect to="/" />;

  return (
    <Fragment>
      <div className={checkoutStyles.checkout}>
        <div className={checkoutStyles.deliveryOptions}>
          <div className={checkoutStyles.deliveryAddress}>
            <h2>
              {!addressSelected
                ? "Select Delivery Address"
                : "Delivery Address"}
            </h2>
            {addressSelected && (
              <button onClick={unSelectAddress}>Change</button>
            )}

            <div className={checkoutStyles.addressesContainer}>
              <Addresses
                showHeader={false}
                selectable={true}
                selected={addressSelected}
                onSelect={onSelectAddress}
              />
            </div>
          </div>
          <div className={checkoutStyles.paymentOptions}>
            <h2>
              {!paymentModeSelected
                ? "Select Payment Method"
                : "Payment Method"}{" "}
            </h2>
            {paymentModeSelected && (
              <button onClick={unSelectPaymentMode}>Change</button>
            )}
            {!paymentModeSelected ? (
              <div>
                <div
                  className={cx(
                    checkoutStyles.paymentOption,
                    checkoutStyles.paymentOptionSelectable
                  )}
                  onClick={() => {
                    onSelectPaymentMode(CARD);
                  }}
                >
                  <h4>{CARD}</h4>
                </div>
                <div
                  className={cx(
                    checkoutStyles.paymentOption,
                    checkoutStyles.paymentOptionSelectable
                  )}
                  onClick={() => {
                    onSelectPaymentMode(COD);
                  }}
                >
                  <h4>{COD}</h4>
                </div>
              </div>
            ) : (
              <div className={checkoutStyles.paymentOption}>
                <h4>{paymentMode}</h4>

                {paymentMode === COD ? (
                  <button
                    className={cx(
                      { [globalStyles.btn]: addressSelected },
                      checkoutStyles.submit,
                      {
                        [globalStyles.inactiveBtn]: !addressSelected,
                      }
                    )}
                    onClick={placeOrder}
                  >
                    Place order
                  </button>
                ) : (
                  <Elements stripe={promise}>
                    <CheckoutForm
                      selectedAddressId={selectedAddressId}
                      placeOrder={placeOrder}
                    />
                  </Elements>
                )}
              </div>
            )}
          </div>
        </div>
        <div className={checkoutStyles.orderSummary}>
          <h2>Order Summary</h2>
          <h3>Basket Value: ₹{total}</h3>
          <h3>Delivery Charge: FREE</h3>
          <h3>Total Amount: ₹{total}</h3>
        </div>
      </div>
    </Fragment>
  );
};

Checkout.propTypes = {
  items: PropTypes.array,
  emptyCart: PropTypes.func.isRequired,
  token: PropTypes.string,
};

const mapStateToProps = (state) => ({
  items: state.cart,
  token: state.auth.token,
});

const mapDispatchToProps = {
  emptyCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

/* <StripeCheckout
  stripeKey={process.env.REACT_APP_STRIPEKEY}
  token={placeOrder}
  amount={total * 100}
  currency="inr"
>
  <button
    className={cx(
      { [globalStyles.btn]: addressSelected },
      checkoutStyles.submit,
      {
        [globalStyles.inactiveBtn]: !addressSelected,
      }
    )}
  >
    Place order
  </button>
</StripeCheckout> */
