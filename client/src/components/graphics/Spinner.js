import React from "react";

import spinnerStyles from "./Spinner.module.css";
import spinner from "./spinner.svg";

const Spinner = ({ height, verticalAlign, margin }) => {
  return (
    <img
      src={spinner}
      alt="spinner"
      className={spinnerStyles.spinner}
      style={{ height, verticalAlign, margin }}
    />
  );
};
export default Spinner;
