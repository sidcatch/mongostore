import React, { Fragment } from "react";
import { connect } from "react-redux";
import { addToCart, incrementItem, decrementItem } from "../../actions/cart";
import PropTypes from "prop-types";

import ProductStyles from "./Product.module.css";

const Product = ({
  image,
  title,
  amount,
  price,
  id,
  itemsInCart,
  addToCart,
  incrementItem,
  decrementItem,
}) => {
  let itemInCart = itemsInCart.find((item) => item.id === id);
  return (
    <Fragment>
      <div className={ProductStyles.productContainer}>
        <div className={ProductStyles.imageContainer}>
          <img className={ProductStyles.image} src={image} alt="product" />
        </div>

        <h3 className={ProductStyles.title}>{title}</h3>
        <p className={ProductStyles.amount}>{amount}</p>
        <h4 className={ProductStyles.price}>
          price:<span className={ProductStyles.rupees}>₹{price}</span>{" "}
        </h4>

        {!itemInCart ? (
          <button
            className={ProductStyles.addToCart}
            onClick={() => addToCart({ title, price, id })}
          >
            Add to cart
          </button>
        ) : (
          <div className={ProductStyles.quantityContainer}>
            <button
              className={ProductStyles.incAndDec}
              onClick={() => decrementItem(id)}
            >
              -
            </button>
            <span className={ProductStyles.quantity}>
              {itemInCart.quantity}
            </span>

            <button
              className={ProductStyles.incAndDec}
              onClick={() => incrementItem(id)}
            >
              +
            </button>
          </div>
        )}
      </div>
    </Fragment>
  );
};

Product.propTypes = {
  itemsInCart: PropTypes.array,
  addToCart: PropTypes.func.isRequired,
  incrementItem: PropTypes.func.isRequired,
  decrementItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  itemsInCart: state.cart,
});

const mapDispatchToProps = {
  addToCart,
  incrementItem,
  decrementItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
