import React, { Fragment, useState, useEffect } from "react";

import Product from "./Product";
//import ProductProxy from "./ProductProxy";

import ProductsStyles from "./Products.module.css";

import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/api/product");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <Fragment>
      <div className={ProductsStyles.porductsContainer}>
        <h2 className={ProductsStyles.title}>
          All Products
          <button className={ProductsStyles.viewAllButton}>View all</button>
        </h2>

        {products.map(({ image, title, amount, price }, index) => (
          <Product
            image={image}
            title={title}
            amount={amount}
            price={price}
            key={index}
          />
        ))}
        <div className={ProductsStyles.pageSelector}>
          <p className={ProductsStyles.pageNumber}>page 1 of 3</p>
          <span className={ProductsStyles.pageNumbers}>
            <button className={ProductsStyles.pageButton}>1</button>
            <button className={ProductsStyles.pageButton}>2</button>
            <button className={ProductsStyles.pageButton}>3</button>
          </span>
        </div>
      </div>
    </Fragment>
  );
};
export default Products;
