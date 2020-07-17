import React, { Fragment, useState } from "react";

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

  const onSubmit = async (e) => {
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
        <button type="button" className={searchBarStyles.searchButton}>
          <img
            className={cx(searchBarStyles.searchIcon)}
            src={searchImg}
            alt="search"
          />
        </button>
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
