import React from "react";
import { Link } from "react-router-dom";

import "../../App.css";

const DropdownItem = ({ icon, title, link, click }) => {
  if (link) {
    return (
      <Link to={link} style={{ textDecoration: "none" }}>
        <li className="dropdown-item">
          <img className="small-icon" src={icon} alt="" />
          <span className="dropdown-text">{title}</span>
        </li>
      </Link>
    );
  } else if (click) {
    return (
      <li className="dropdown-item" onClick={() => click()}>
        <img className="small-icon" src={icon} alt="" />
        <span className="dropdown-text">{title}</span>
      </li>
    );
  } else {
    return (
      <li className="dropdown-item">
        <img className="small-icon" src={icon} alt="" />
        <span className="dropdown-text">{title}</span>
      </li>
    );
  }
};

export default DropdownItem;
