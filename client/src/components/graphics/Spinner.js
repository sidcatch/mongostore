import React from "react";

import spinnerStyles from "./Spinner.module.css";
import spinner from "./spinner.svg";

const Spinner = () => {
  return (
    <div>
      <img src={spinner} alt="spinner" className={spinnerStyles.spinner} />
    </div>
  );
};
export default Spinner;
