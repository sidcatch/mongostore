import React from "react";
import { Link } from "react-router-dom";

import "../../App.css";

const SlideMenuItem = ({ icon, title, link, click }) => {
  if (link) {
    return (
      <Link to={link} style={{ textDecoration: "none" }}>
        <li className="slide-menu-item">
          <img className="small-icon slide-menu-icons" src={icon} alt="" />
          <span className="slide-menu-text">{title}</span>
        </li>
      </Link>
    );
  } else if (click) {
    return (
      <li className="slide-menu-item" onClick={() => click()}>
        <img className="small-icon slide-menu-icons" src={icon} alt="" />
        <span className="slide-menu-text">{title}</span>
      </li>
    );
  } else {
    return (
      <li className="slide-menu-item">
        <img className="small-icon slide-menu-icons" src={icon} alt="" />
        <span className="slide-menu-text">{title}</span>
      </li>
    );
  }
};

export default SlideMenuItem;
