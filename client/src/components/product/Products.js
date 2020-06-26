import React, { Fragment, useState, useEffect } from "react";

import Product from "./Product";

import ProductsStyles from "./Products.module.css";

import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/product");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <Fragment>
      <div className={ProductsStyles.porductsContainer}>
        {products.map(({ image, title, amount, price }, index) => (
          <Product
            image={image}
            title={title}
            amount={amount}
            price={price}
            key={index}
          />
        ))}
      </div>
    </Fragment>
  );
};
export default Products;
