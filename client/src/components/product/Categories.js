import React, { Fragment, useState, useEffect } from "react";

import CategoryPreview from "./CategoryPreview";

import axios from "axios";

const Categories = ({ category }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/api/products/categories`);
        setCategories(res.data);
      } catch (err) {
        console.log(err);
        //console.log(err.response.data);
      }
    })();
  }, []);

  return (
    <Fragment>
      {categories.slice(0, 1).map((category, index) => (
        <CategoryPreview category={category} key={index} />
      ))}
    </Fragment>
  );
};

export default Categories;
