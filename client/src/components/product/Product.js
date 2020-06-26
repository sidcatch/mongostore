import React, { Fragment } from "react";

import ProductStyles from "./Product.module.css";

const Product = ({ image, title, amount, price }) => {
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
        <button className={ProductStyles.addToCart}>Add to cart</button>
      </div>
    </Fragment>
  );
};
export default Product;
