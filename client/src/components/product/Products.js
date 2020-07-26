import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useQuery from "../../util/useQuery";

import Product from "./Product";
import ProductProxy from "./ProductProxy";

import ProductsStyles from "./Products.module.css";

import axios from "axios";

import dummyArray from "../../util/dummyArray";
import parseCategory from "../../util/parseCategory";

const Products = ({ match }) => {
  let query = useQuery();
  let page = query.get("page");
  if (!page) page = "1";

  const [products, setProducts] = useState([]);
  const [productsState, setProductsState] = useState({
    productsLoading: true,
    totalProducts: 0,
    itemsPerPage: 0,
    numOfProducts: 0,
    lastPage: 0,
    hasNextPage: true,
    hasPreviousPage: false,
  });

  let {
    productsLoading,
    totalProducts,
    itemsPerPage,
    numOfProducts,
    lastPage,
    hasNextPage,
    hasPreviousPage,
  } = productsState;

  useEffect(() => {
    setProductsState((p) => ({ ...p, productsLoading: true }));
    (async () => {
      let category = null;
      if (match.params.category) {
        category = match.params.category;
      }

      try {
        const res = await axios.get(
          `/api/products/category/${category}?page=${page}`
        );

        let { products, totalProducts, itemsPerPage } = res.data;

        setProducts(products);
        setProductsState({
          productsLoading: false,
          totalProducts,
          itemsPerPage,
          numOfProducts: products.length,
          lastPage: Math.ceil(totalProducts / itemsPerPage),
          hasNextPage: itemsPerPage * page < totalProducts,
          hasPreviousPage: page > 1,
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, [match.params.category, page]);

  return (
    <Fragment>
      <div className={ProductsStyles.porductsContainer}>
        <div className={ProductsStyles.header}>
          <h2 className={ProductsStyles.title}>
            {parseCategory(match.params.category)}
          </h2>
          <p className={ProductsStyles.info}>
            ({(parseInt(page) - 1) * itemsPerPage + 1} -{" "}
            {(parseInt(page) - 1) * itemsPerPage + numOfProducts} of{" "}
            {totalProducts} producs)
          </p>
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
          : dummyArray.map((dummy, index) => {
              return <ProductProxy key={index} />;
            })}

        <div className={ProductsStyles.pageSelector}>
          <p className={ProductsStyles.pageNumber}>
            page {page} of {lastPage}
          </p>
          <span className={ProductsStyles.pageNumbers}>
            {parseInt(page) > 2 && (
              <Link to={{ pathname: `${match.url}`, search: "?page=1" }}>
                <button className={ProductsStyles.pageButton}>1</button>
              </Link>
            )}
            {parseInt(page) > 3 && <span>...</span>}
            {hasPreviousPage && (
              <Link
                to={{
                  pathname: `${match.url}`,
                  search: `?page=${parseInt(page) - 1}`,
                }}
              >
                <button className={ProductsStyles.pageButton}>
                  {parseInt(page) - 1}
                </button>
              </Link>
            )}
            <button className={ProductsStyles.currentPageButton}>{page}</button>
            {hasNextPage && (
              <Link
                to={{
                  pathname: `${match.url}`,
                  search: `?page=${parseInt(page) + 1}`,
                }}
              >
                <button className={ProductsStyles.pageButton}>
                  {parseInt(page) + 1}
                </button>
              </Link>
            )}
            {parseInt(page) < parseInt(lastPage) - 2 && <span>...</span>}
            {parseInt(page) < parseInt(lastPage) - 1 && (
              <Link
                to={{ pathname: `${match.url}`, search: `?page=${lastPage}` }}
              >
                <button className={ProductsStyles.pageButton}>
                  {lastPage}
                </button>
              </Link>
            )}
          </span>
        </div>
      </div>
    </Fragment>
  );
};

export default Products;
