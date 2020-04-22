import React from "react";

import "../../App.css";
import spinner from "./spinner.svg";

const Spinner = () => {
  return (
    <div className="spinner-container">
      <img src={spinner} alt="spinner" className="spinner" />
    </div>
  );
};
export default Spinner;
