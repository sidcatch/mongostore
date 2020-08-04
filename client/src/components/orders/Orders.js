import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { emptyCart } from "../../actions/cart";
import PropTypes from "prop-types";

import Order from "./Order";

import cx from "classnames";
import ordersStyles from "./Orders.module.css";
import globalStyles from "../../Global.module.css";

import shoppingBagImg from "../../icons/shopping-bag.svg";

//can become a form or simply a display. reuse this in checkout
const Orders = () => {
  return (
    <Fragment>
      <h1 className={cx(globalStyles.large, globalStyles["mt-1point5"])}>
        <img
          className={cx(globalStyles.largeIcon, globalStyles["mr-1"])}
          style={{ verticalAlign: "top" }}
          src={shoppingBagImg}
          alt="profile"
        />
        Orders
      </h1>
      <div className={ordersStyles.orders}>
        <Order />
        <Order />
      </div>
    </Fragment>
  );
};

export default Orders;
