import React, { Fragment } from "react";

import ProductsStyles from "./Products.module.css";

const Products = () => {
  return (
    <Fragment>
      <div className={ProductsStyles.porductsContainer}>
        <div className={ProductsStyles.productContainer}>
          <div className={ProductsStyles.imageContainer}>
            <img
              className={ProductsStyles.image}
              src="static/images/chips.jpg"
              alt="i"
            />
          </div>

          <h3 className={ProductsStyles.title}>Potato Chips</h3>
          <p className={ProductsStyles.amount}>1 pc</p>
          <h4 className={ProductsStyles.price}>
            price:<span className={ProductsStyles.rupees}>₹10</span>{" "}
          </h4>
          <button className={ProductsStyles.addToCart}>Add to cart</button>
        </div>
        <div className={ProductsStyles.productContainer}>
          <div className={ProductsStyles.imageContainer}>
            <img
              className={ProductsStyles.image}
              src="static/images/chips.jpg"
              alt="i"
            />
          </div>

          <h3 className={ProductsStyles.title}>Potato Chips</h3>
          <p className={ProductsStyles.amount}>1 pc</p>
          <h4 className={ProductsStyles.price}>
            price:<span className={ProductsStyles.rupees}>₹10</span>{" "}
          </h4>
          <button className={ProductsStyles.addToCart}>Add to cart</button>
        </div>
        <div className={ProductsStyles.productContainer}>
          <div className={ProductsStyles.imageContainer}>
            <img
              className={ProductsStyles.image}
              src="static/images/chips.jpg"
              alt="i"
            />
          </div>

          <h3 className={ProductsStyles.title}>Potato Chips</h3>
          <p className={ProductsStyles.amount}>1 pc</p>
          <h4 className={ProductsStyles.price}>
            price:<span className={ProductsStyles.rupees}>₹10</span>{" "}
          </h4>
          <button className={ProductsStyles.addToCart}>Add to cart</button>
        </div>
        <div className={ProductsStyles.productContainer}>
          <div className={ProductsStyles.imageContainer}>
            <img
              className={ProductsStyles.image}
              src="static/images/chips.jpg"
              alt="i"
            />
          </div>

          <h3 className={ProductsStyles.title}>Potato Chips</h3>
          <p className={ProductsStyles.amount}>1 pc</p>
          <h4 className={ProductsStyles.price}>
            price:<span className={ProductsStyles.rupees}>₹10</span>{" "}
          </h4>
          <button className={ProductsStyles.addToCart}>Add to cart</button>
        </div>
        <div className={ProductsStyles.productContainer}>
          <div className={ProductsStyles.imageContainer}>
            <img
              className={ProductsStyles.image}
              src="static/images/chips.jpg"
              alt="i"
            />
          </div>

          <h3 className={ProductsStyles.title}>Potato Chips</h3>
          <p className={ProductsStyles.amount}>1 pc</p>
          <h4 className={ProductsStyles.price}>
            price:<span className={ProductsStyles.rupees}>₹10</span>{" "}
          </h4>
          <button className={ProductsStyles.addToCart}>Add to cart</button>
        </div>
        <div className={ProductsStyles.productContainer}>
          <div className={ProductsStyles.imageContainer}>
            <img
              className={ProductsStyles.image}
              src="static/images/chips.jpg"
              alt="i"
            />
          </div>

          <h3 className={ProductsStyles.title}>Potato Chips</h3>
          <p className={ProductsStyles.amount}>1 pc</p>
          <h4 className={ProductsStyles.price}>
            price:<span className={ProductsStyles.rupees}>₹10</span>{" "}
          </h4>
          <button className={ProductsStyles.addToCart}>Add to cart</button>
        </div>
        <div className={ProductsStyles.productContainer}>
          <div className={ProductsStyles.imageContainer}>
            <img
              className={ProductsStyles.image}
              src="static/images/chips.jpg"
              alt="i"
            />
          </div>

          <h3 className={ProductsStyles.title}>Potato Chips</h3>
          <p className={ProductsStyles.amount}>1 pc</p>
          <h4 className={ProductsStyles.price}>
            price:<span className={ProductsStyles.rupees}>₹10</span>{" "}
          </h4>
          <button className={ProductsStyles.addToCart}>Add to cart</button>
        </div>
      </div>
    </Fragment>
  );
};
export default Products;
