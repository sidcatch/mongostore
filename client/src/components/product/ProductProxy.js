import React, { Fragment } from "react";

import ProductProxyStyles from "./ProductProxy.module.css";

const ProductProxy = () => {
  return (
    <Fragment>
      <div className={ProductProxyStyles.productContainer}>
        <div className={ProductProxyStyles.imageContainer}></div>

        <div className={ProductProxyStyles.title}></div>
        <div className={ProductProxyStyles.amount}></div>
        <div className={ProductProxyStyles.price}></div>
        <div className={ProductProxyStyles.addToCart}></div>
      </div>
    </Fragment>
  );
};
export default ProductProxy;
