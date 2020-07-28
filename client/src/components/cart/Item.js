import React, { Fragment } from "react";
import { connect } from "react-redux";
import { incrementItem, decrementItem } from "../../actions/cart";
import PropTypes from "prop-types";

import cartStyles from "./Cart.module.css";

const Item = ({ title, price, quantity, id, incrementItem, decrementItem }) => {
  return (
    <Fragment>
      <ul className={cartStyles.item}>
        <li className={cartStyles.title}>{title}</li>
        <li className={cartStyles.price}>₹{price}</li>
        <li className={cartStyles.quantity}>
          <button
            className={cartStyles.decrement}
            onClick={() => decrementItem(id)}
          >
            -
          </button>
          <span className={cartStyles.qty}>{quantity}</span>

          <button
            className={cartStyles.increment}
            onClick={() => incrementItem(id)}
          >
            +
          </button>
        </li>
        <li className={cartStyles.subTotal}>₹{price * quantity}</li>
      </ul>
    </Fragment>
  );
};

Item.propTypes = {
  incrementItem: PropTypes.func.isRequired,
  decrementItem: PropTypes.func.isRequired,
};
const mapDispatchToProps = {
  incrementItem,
  decrementItem,
};

export default connect(null, mapDispatchToProps)(Item);
