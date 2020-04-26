import React from "react";
import { Link } from "react-router-dom";

import "../../App.css";
import dropdownItemStyles from "./DropdownItem.module.css";
import globalStyles from "../../Global.module.css";

const DropdownItem = ({ icon, title, link, click }) => {
  if (link) {
    return (
      <Link to={link} style={{ textDecoration: "none" }}>
        <li className={dropdownItemStyles.dropdownItem}>
          <img className={globalStyles.smallIcon} src={icon} alt="" />
          <span className={dropdownItemStyles.dropdownText}>{title}</span>
        </li>
      </Link>
    );
  } else if (click) {
    return (
      <li className={dropdownItemStyles.dropdownItem} onClick={() => click()}>
        <img className={globalStyles.smallIcon} src={icon} alt="" />
        <span className={dropdownItemStyles.dropdownText}>{title}</span>
      </li>
    );
  } else {
    return (
      <li className={dropdownItemStyles.dropdownItem}>
        <img className={globalStyles.smallIcon} src={icon} alt="" />
        <span className={dropdownItemStyles.dropdownText}>{title}</span>
      </li>
    );
  }
};

export default DropdownItem;
