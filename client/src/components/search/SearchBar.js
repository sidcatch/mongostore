import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import cx from "classnames";
import searchBarStyles from "./SearchBar.module.css";

import searchImg from "../../icons/search.svg";

//import axios from "axios";

const SearchBar = () => {
  const [formState, setFormState] = useState({
    query: "",
  });

  const { query } = formState;

  const onChange = (e) => {
    let nextFormState = { ...formState, [e.target.name]: e.target.value };
    setFormState(nextFormState);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("search");
  };

  let content = (
    <Fragment>
      <form className={searchBarStyles.form} onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          name="query"
          value={query}
          autoComplete="off"
          onChange={(e) => onChange(e)}
        />
        {query ? (
          <Link
            to={{
              pathname: `/products/search`,
              search: `?page=1&q=${query}`,
            }}
          >
            <button className={searchBarStyles.searchButton}>
              <img
                className={cx(searchBarStyles.searchIcon)}
                src={searchImg}
                alt="search"
              />
            </button>
          </Link>
        ) : (
          <button className={searchBarStyles.searchButton}>
            <img
              className={cx(searchBarStyles.searchIcon)}
              src={searchImg}
              alt="search"
            />
          </button>
        )}
      </form>
    </Fragment>
  );

  return (
    <Fragment>
      <div className={searchBarStyles.formContainer}>{content}</div>
    </Fragment>
  );
};

export default SearchBar;
