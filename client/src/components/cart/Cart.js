import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Columns from "./Columns";
import Item from "./Item";

import cx from "classnames";
import cartStyles from "./Cart.module.css";
import globalStyles from "../../Global.module.css";

//can become a form or simply a display. reuse this in checkout
const Cart = () => {
  return (
    <Fragment>
      <div className={cartStyles.cart}>
        <Columns />
        <Item />
        <Item />

        <Link to={"/checkout"} style={{ textDecoration: "none" }}>
          <button className={cx(globalStyles.btn, cartStyles.checkout)}>
            Checkout
          </button>
        </Link>
        <h2 className={cartStyles.total}>TOTAL: ₹3000</h2>
      </div>
    </Fragment>
  );
};

export default Cart;
