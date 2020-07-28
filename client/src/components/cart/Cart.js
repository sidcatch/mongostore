import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { emptyCart } from "../../actions/cart";
import PropTypes from "prop-types";

import Columns from "./Columns";
import Item from "./Item";

import cx from "classnames";
import cartStyles from "./Cart.module.css";
import globalStyles from "../../Global.module.css";

//can become a form or simply a display. reuse this in checkout
const Cart = ({ items, emptyCart }) => {
  let total = 0;
  items.forEach(({ price, quantity }) => {
    total = total + price * quantity;
  });
  return (
    <Fragment>
      <div className={cartStyles.cart}>
        <Columns />

        {items.map(({ title, price, quantity, id }) => (
          <Item
            title={title}
            price={price}
            quantity={quantity}
            id={id}
            key={id}
          />
        ))}
        {items.length > 0 && (
          <Link to={"/checkout"} style={{ textDecoration: "none" }}>
            <button className={cx(globalStyles.btn, cartStyles.checkout)}>
              Checkout
            </button>
          </Link>
        )}

        <button onClick={emptyCart} className={cartStyles.emptyCart}>
          Empty Cart
        </button>
        <h2 className={cartStyles.total}>TOTAL: ₹{total}</h2>
      </div>
    </Fragment>
  );
};

Cart.propTypes = {
  items: PropTypes.array,
  emptyCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.cart,
});

const mapDispatchToProps = {
  emptyCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
