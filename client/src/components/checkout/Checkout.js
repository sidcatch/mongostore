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

const COD = "Cash On Delivery";
const CARD = "Credit Card / Debit Card";

//can become a form or simply a display. reuse this in checkout
const Checkout = ({ items, emptyCart }) => {
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

  const placeOrder = () => {
    setCheckoutState((prevState) => ({
      ...prevState,
      orderPlaced: true,
    }));
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
              </div>
            )}
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

Checkout.propTypes = {
  items: PropTypes.array,
  emptyCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.cart,
});

const mapDispatchToProps = {
  emptyCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
