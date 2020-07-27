import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Product from "./Product";
import ProductProxy from "./ProductProxy";

import CategoryPreviewStyles from "./CategoryPreview.module.css";

import axios from "axios";

import dummyArray from "../../util/dummyArray";
import parseCategory from "../../util/parseCategory";

const CategoryPreview = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [productsState, setProductsState] = useState({
    productsLoading: true,
  });

  let { productsLoading } = productsState;

  useEffect(() => {
    setProductsState((p) => ({ ...p, productsLoading: true }));
    (async () => {
      try {
        const res = await axios.get(
          `/api/products/category-preview/${category}`
        );

        let products = res.data;

        setProducts(products);
        setProductsState({});
      } catch (err) {
        console.log(err);
        console.log(err.response.data);
        setProductsState((p) => ({ ...p, productsLoading: false }));
      }
    })();
  }, [category]);

  return (
    <Fragment>
      <div className={CategoryPreviewStyles.porductsContainer}>
        <div className={CategoryPreviewStyles.header}>
          <h2 className={CategoryPreviewStyles.title}>
            {parseCategory(category)}
          </h2>
          <Link
            to={{
              pathname: `/products/category/${category}`,
            }}
          >
            <button className={CategoryPreviewStyles.viewAllButton}>
              View All
            </button>
          </Link>
        </div>

        {!productsLoading
          ? products.map(({ image, title, amount, price, _id }) => {
              return (
                <Product
                  image={image}
                  title={title}
                  amount={amount}
                  price={price}
                  key={_id}
                />
              );
            })
          : dummyArray.slice(0, 4).map((dummy, index) => {
              return <ProductProxy key={index} />;
            })}
      </div>
    </Fragment>
  );
};

export default CategoryPreview;
